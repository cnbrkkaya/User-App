import React, { Component } from 'react';
import posed from 'react-pose';
import UserConsumer from '../context';
import axios from 'axios';
const Box = posed.div({
   visible: {
      opacity: 1,
      transition: { duration: 300 },
      applyAtStart: {
         display: 'block'
      }
   },
   hidden: {
      opacity: 0,
      transition: { duration: 300 },
      applyAtEnd: {
         display: 'none'
      }
   }
});

class AddUser extends Component {
   state = {
      visible: true,
      name: '',
      salary: '',
      department: '',
      error: false
   };

   changeVisibility = e => {
      this.setState({
         visible: !this.state.visible
      });
   };

   validateForm = () => {
      const { name, department, salary } = this.state;
      if (name === `` || salary === `` || department === ``) {
         return false;
      }
      return true;
   };

   changeInput = e => {
      this.setState({
         [e.target.name]: e.target.value
      });
   };
   addUser = async (dispatch, e) => {
      e.preventDefault();
      const { name, department, salary } = this.state;
      const newUser = {
         name: name,
         department: department,
         salary: salary
      };

      if (!this.validateForm()) {
         this.setState({
            error: true
         });
         return;
      }
      const response = await axios.post('http://localhost:3004/users', newUser);
      console.log('response');
      console.log(response);
      dispatch({ type: 'ADD_USER', payload: response.data });
      //Redirect
      this.props.history.push(`/`);
   };

   render() {
      const { visible, name, department, salary, error } = this.state;

      return (
         <UserConsumer>
            {value => {
               const { dispatch } = value;
               return (
                  <div className="col-md-8 mb-4">
                     <button onClick={this.changeVisibility} className="btn btn-dark btn-block mb-2">
                        {visible ? 'Hide Form' : 'Show Form'}
                     </button>
                     <Box pose={this.state.visible ? 'visible' : 'hidden'}>
                        <div className="card">
                           <div className="card-header">
                              <h4>Add User Form</h4>
                           </div>

                           <div className="card-body">
                              {error ? <div className="alert alert-danger ">Lutfen Eksiksiz giriniz</div> : null}
                              <form onSubmit={this.addUser.bind(this, dispatch)}>
                                 <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input onChange={this.changeInput} value={name} type="text" name="name" id="id" placeholder="Enter Name" className="form-control" />
                                 </div>
                                 <div className="form-group">
                                    <label htmlFor="department">Department</label>
                                    <input onChange={this.changeInput} value={department} type="text" name="department" id="department" placeholder="Enter Department" className="form-control" />
                                 </div>
                                 <div className="form-group">
                                    <label htmlFor="salary">Salary</label>
                                    <input onChange={this.changeInput} value={salary} type="text" name="salary" id="id" placeholder="Enter Salary" className="form-control" />
                                 </div>
                                 <button className="btn btn-danger btn-block" type="submit">
                                    Add User
                                 </button>
                              </form>
                           </div>
                        </div>
                     </Box>
                  </div>
               );
            }}
         </UserConsumer>
      );
   }
}
export default AddUser;
