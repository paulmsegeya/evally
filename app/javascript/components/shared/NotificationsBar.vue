<template>
  <v-snackbar
    v-model="visible"
    :color="message.type"
    :bottom="true"
    :timeout="4000"
    data-cy="notification"
  >
    {{ message.text }}
    <v-btn @click="visible = false" color="white" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NotificationsBar',
  data () {
    return {
      visible: false
    }
  },
  computed: {
    ...mapGetters({
      hasMessage: 'NotificationsModule/hasMessage',
      message: 'NotificationsModule/message'
    })
  },
  mounted () {
    this.$store.watch(context => {
      if (this.hasMessage) {
        this.visible = false

        this.$store.dispatch('NotificationsModule/flash')
          .then(() => { this.visible = true })
      }
    })
  }
}
</script>
