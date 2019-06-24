<template>
  <link-form :is-edit="false" submit-button="Create" />
</template>

<script>
import LinkForm from './components/LinkForm'
export default {
  name: 'CreateLink',
  components: { LinkForm }
}
</script>
