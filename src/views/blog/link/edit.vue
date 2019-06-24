<template>
  <link-form :is-edit="true" submit-button="Confirm Edit" />
</template>

<script>
import LinkForm from './components/LinkForm'
export default {
  name: 'EditLink',
  components: { LinkForm }
}
</script>
