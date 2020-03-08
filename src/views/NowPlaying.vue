<template>
  <div class="nowplaying">
    <h1>NowPlaying</h1>
    <button @click="spotifyLogin">認証</button>
    <br>
    <button @click="getNowPlaying">再生中の曲情報取得</button>
    <div v-if="nowPlaying != null">
      <p>今再生中の曲 : {{ nowPlaying.item.artists[0].name }} の {{ nowPlaying.item.name }}</p>
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
    params: Object
  },
  methods: {
    spotifyLogin: function() {
      let endpoint = 'https://accounts.spotify.com/authorize'
      let response_type = 'token'
      let client_id = '8f6071cd5afe45c99d7ea88d26c4b938'
      let redirect_uri = 'http://localhost:8080'
      let scope = 'user-read-currently-playing'
      location.href = endpoint + 
        '?response_type=' + response_type +
        '&client_id=' + client_id +
        '&redirect_uri=' + redirect_uri +
        '&scope=' + scope
    },
    getNowPlaying: function() {
      let endpoint = 'https://api.spotify.com/v1/me/player/currently-playing?market=JP'
      let data = {
        headers: {
          'Authorization': this.params.token_type + ' ' + this.params.access_token
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