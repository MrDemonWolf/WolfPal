<template>
  <div class="container mx-auto">
    <GoalsWeekly :goals="weeklyGoals" />
  </div>
</template>

<script>
export default {
  layout: 'dashboard',

  middleware: ['auth'],

  async fetch({ store }) {
    await store.dispatch('goals/weekly/FETCH_GOALS')
  },

  head() {
    return {
      title: 'Weekly Goals',
    }
  },

  computed: {
    weeklyGoals() {
      return this.$store.state.goals.weekly.goals
    },
  },
}
</script>
