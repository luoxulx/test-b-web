<template>
  <category-form :is-edit="true" submit-button="Confirm Edit" />
</template>

<script>
import CategoryForm from './components/CategoryForm'
export default {
  name: 'EditCategory',
  components: { CategoryForm }
}
</script>
