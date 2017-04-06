<template>
  <div class="columns is-mobile">
    <div class="column is-half is-offset-one-quarter">
      <p class="control">
        <input class="input" type="text" v-model="newUser.name">
      </p>
      <p v-if="error !== ''">{{ error }}</p>
      <p class="control">
        <button class="button is-primary" @click="chooseUser">Dalej</button>
      </p>
      <div>
        <div v-for="n in 20" class="avatars" :id="'avatar-' + n" @click="chooseAvatar(n)">
          <img :src="'src/assets/' + n + '.jpg'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import db from '../firebase'
  import toastr from 'toastr'
  import _ from 'lodash'
  import { eventBus } from '../main'
  let usersRef = db.ref('users')

  export default {
    name: 'app',
    data () {
      return {
        newUser: {
          name: '',
          avatar: 3
        },
        error: ''
      }
    },
    firebase () {
      return {
        users: usersRef
      }
    },
    methods: {
      checkIfUserExist () {
        let user = _.find(this.users, {'name': this.newUser.name})
        if (typeof user !== 'undefined') {
          return user
        }
        return false
      },
      chooseUser () {
        let errors = 0
        if (this.newUser.name === '') {
          errors++
          this.error = 'Podaj ksywę :)'
        }
        if (errors === 0) {
          this.error = ''
          if (!this.checkIfUserExist()) {
            return usersRef.push(this.newUser)
              .then(() => {
                toastr.success('User dodany!')
                let user = _.find(this.users, {'name': this.newUser.name})
                eventBus.$emit('userWasChosen', {user, users: this.users})
              })
              .catch((err) => {
                console.log(err)
                toastr.error('Błąd!')
              })
          } else {
            toastr.success('User z bazy!')
            const user = this.checkIfUserExist()
            eventBus.$emit('userWasChosen', {user, users: this.users})
          }
        }
      },
      chooseAvatar (n) {
        this.newUser.avatar = n
        if (document.querySelector('.active-avatar')) {
          document.querySelector('.active-avatar').classList.remove('active-avatar')
        }
        document.getElementById('avatar-' + n).classList.add('active-avatar')
      }
    }
  }
</script>

<style>
  .avatars {
    width: 40px;
    height: 40px;
    float: left;
    cursor: pointer;
  }
  .active-avatar {
    border: 1px solid black;
  }
</style>
