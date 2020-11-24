import Api from '@/services/api'

export default {
  castBallot(electionId, voterId, picked) {
    return Api().post('castBallot', {       
      electionId: electionId,
      voterId: voterId,
      picked: picked
    })
  },
  queryAll() {
    return Api().get('queryAll')
  },
  queryByObjectType() {
    return Api().get('queryByObjectType')
  },
  queryWithQueryString(selected) {
    return Api().post('queryWithQueryString', {
      selected: selected
    }) 
  },
  registerVoter(voterId, registrarId, firstName, lastName) {
    return Api().post('registerVoter', {
      voterId: voterId,
      registrarId: registrarId,
      firstName: firstName,
      lastName: lastName,
    }) 
  },
  validateVoter(voterId) {
    return Api().post('validateVoter', {
      voterId: voterId
    }) 
  },
  queryByKey(key) {
    return Api().post('queryByKey', {
      key: key
    }) 
  },
  getCurrentStanding() {
    return Api().get('getCurrentStanding')
  },


  //----------------------------------------------
  loginVoter(voterId, pwd) {
    return Api().post('loginVoter', {
      voterId: voterId,
      pwd: pwd
    }
    )
  },

  signUpVoter(voterId, pwd, name, email, role) {
    console.log('ApiService');
    return Api().post('signUpVoter', {
      voterId: voterId,
      pwd: pwd,
      name: name,
      email: email,
      role: role
    })
  },


//----------------------------------------------  
}