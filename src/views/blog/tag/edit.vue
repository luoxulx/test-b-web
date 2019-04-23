<template>
  <tag-form :is-edit="true" submit-button="Confirm Edit" />
</template>

<script>
import TagForm from './components/TagForm'
export default {
  name: 'EditTag',
  components: { TagForm }
}
</script>
