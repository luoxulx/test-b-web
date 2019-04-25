<template>
  <video-form :is-edit="false" submit-button="Create" />
</template>

<script>
import VideoForm from './components/VideoForm'
export default {
  name: 'CreateVideo',
  components: { VideoForm }
}
</script>
