<template>
  <tag-form :is-edit="false" submit-button="Create" />
</template>

<script>
import TagForm from './components/TagForm'
export default {
  name: 'CreateTag',
  components: { TagForm }
}
</script>
