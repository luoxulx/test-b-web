<template>
  <category-form :is-edit="false" submit-button="Create" />
</template>

<script>
import CategoryForm from './components/CategoryForm'
export default {
  name: 'CreateCategory',
  components: { CategoryForm }
}
</script>
