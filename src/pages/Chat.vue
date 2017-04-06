<template>
  <div class="columns is-mobile">
    <div class="column is-half is-offset-one-quarter">
      <nav class="panel">
        <p class="panel-heading">
          Chat
        </p>
        <a class="panel-block" v-for="message in msgs">
          <span class="panel-icon">
            <img class="user-avatar" :src="'src/assets/' + messageUserAvatar(message) + '.jpg'" alt="">
          </span>
          {{ message.message }}
        </a>
        <div class="panel-block">
          <p class="control">
            <input class="input is-small" type="text" v-model="newMessage.message" @keyup.enter="sendMsg" placeholder="wiadomość...">
          </p>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  import db from '../firebase'
  import toastr from 'toastr'
  import _ from 'lodash'
  let messagesRef = db.ref('messages')

  export default {
    name: 'app',
    props: ['chosenUser', 'users'],
    data () {
      return {
        allUsers: this.users,
        user: this.chosenUser,
        newMessage: {
          user: this.chosenUser['.key'],
          message: ''
        }
      }
    },
    computed: {
      msgs () {
        if (typeof this.messages !== 'undefined') {
          return _.slice(this.messages, this.messages.length - 8)
        }
        return []
      }
    },
    firebase () {
      return {
        messages: messagesRef
      }
    },
    methods: {
      sendMsg () {
        return messagesRef.push(this.newMessage)
          .then(() => {
            toastr.success('Wiadomość wysłana!')
            this.newMessage.message = ''
          })
          .catch((err) => {
            console.log(err)
            toastr.error('Wiadomość nie wysłana!')
          })
      },
      messageUserName (message) {
        let user = _.find(this.allUsers, {'.key': message.user})
        return user.name
      },
      messageUserAvatar (message) {
        let user = _.find(this.allUsers, {'.key': message.user})
        return user.avatar
      }
    }
  }
</script>

<style>
  .user-avatar {
    height: 20px;
    width: 20px;
  }
  .user-info {
    float: right;
    clear: right;
  }
  .panel-icon {
    width: 20px;
  }

</style>
