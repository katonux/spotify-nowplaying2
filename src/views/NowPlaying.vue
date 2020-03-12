<template>
  <div class="nowplaying">
    <h1>NowPlaying</h1>
    <button @click="spotifyLogin">認証</button>
    <br>
    <button @click="getNowPlaying">最近再生した曲情報取得</button>

    <div v-if="nowPlaying != null">
    <div v-for="item in nowPlaying.items" :key="item.track.id">
      <p>{{ item.track.artists[0].name }} の {{ item.track.name }}</p>
      <img :src="item.track.album.images[1].url">
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function() {
    return {
      nowPlaying: null
    }
  },
  props: {
    routeParams: Object
  },
  created: function() {
    if (this.$route.hash) {
      this.$router.push(this.$route.fullPath.replace('#', '?'))
    }
  },
  methods: {
    spotifyLogin: function() {
      let endpoint = 'https://accounts.spotify.com/authorize'
      let response_type = 'token'
      let client_id = '8f6071cd5afe45c99d7ea88d26c4b938'
      let redirect_uri = 'http://localhost:8080'
      let scope = 'user-read-recently-played'
      location.href = endpoint + 
        '?response_type=' + response_type +
        '&client_id=' + client_id +
        '&redirect_uri=' + redirect_uri +
        '&scope=' + scope
    },
    getNowPlaying: function() {
      let endpoint = 'https://api.spotify.com/v1/me/player/recently-played'
      let data = {
        headers: {
          'Authorization': this.routeParams.token_type + ' ' + this.routeParams.access_token
        },
        data: {}
      }
      axios
      .get(endpoint, data)
      .then(res => {
        this.nowPlaying = res.data
      })
      .catch(err => {
        console.error(err)
      })
    }
  }
}
</script>