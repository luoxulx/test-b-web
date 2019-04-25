<template>
  <video-form :is-edit="true" submit-button="Edit" />
</template>

<script>
import VideoForm from './components/VideoForm'
export default {
  name: 'EditVideo',
  components: { VideoForm }
}
</script>
