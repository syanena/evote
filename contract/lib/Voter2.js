'use strict';

class Voter {
  /**
   *
   * Voter
   *
   * Constructor for a Voter object. Voter has a voterId and registrar that the
   * voter is . 
   *  
   * @param items - an array of choices 
   * @param election - what election you are making ballots for 
   * @param voterId - the unique Id which corresponds to a registered voter
   * @returns - registrar object
   */


  constructor(voterId, password, name, email, role) {
      if(this.validateVoter(voterId) && this.validatePassword(password)) {
          this.voterId = voterId;
          this.pwd = password;
          this.name = name;
          this.email = email;
          this.role = role;
          this.ballotCreated = false;
          this.type  = 'voter';
          if(this.__isContract) {
              delete this.__isContract;
          }

        return this;
      }else if (!this.validateVoter(voterId)){
        throw new Error('the voterId is not valid.');
      } else {
        throw new Error('the registrarId is not valid.');
      }
  }


  /**
   *
   * validateVoter
   *
   * check for valid ID card - stateID or drivers License.
   *  
   * @param voterId - an array of choices 
   * @returns - yes if valid Voter, no if invalid
   */
  async validateVoter(voterId) {
    //VoterId error checking here, i.e. check if valid drivers License, or state ID
    if (voterId) {
      return true;
    } else {
      return false;
    }
  }

  /**
   *
   * validateRegistrar
   *
   * check for valid registrarId, should be cross checked with government
   *  
   * @param voterId - an array of choices 
   * @returns - yes if valid Voter, no if invalid
   */
  async validateRegistrar(registrarId) {

    //registrarId error checking here, i.e. check if valid drivers License, or state ID
    if (registrarId) {
      return true;
    } else {
      return false;
    }
  }



  async validatePassword(password) {
      if(password) {
          return true;
      }else {
          return false;
      }
    }

}
module.exports = Voter;