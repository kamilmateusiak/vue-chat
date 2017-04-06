<template>
    <div class="container">
      <select-user v-if="pageSwitcher === 'user'"></select-user>
        <chat :chosenUser="user" :users="users" v-else></chat>
    </div>
</template>

<script>
  import Chat from './pages/Chat.vue'
  import SelectUser from './pages/SelectUser.vue'
  import { eventBus } from './main'

  export default {
    name: 'app',
    data () {
      return {
        pageSwitcher: 'user',
        user: {},
        users: []
      }
    },
    components: {
      Chat,
      SelectUser
    },
    created () {
      eventBus.$on('userWasChosen', (data) => {
        console.log(data.users)
        this.user = data.user
        this.users = data.users
        setTimeout(() => {
          this.pageSwitcher = 'chat'
        }, 3000)
      })
    }
  }
</script>

<style>

</style>
