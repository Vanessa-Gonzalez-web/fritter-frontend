<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
    <article
        class="follower" 
    >
        <header>
            <h3 class="user">
                @{{ follower.username }}
            </h3>
        </header>
    </article>
</template>

<script>
export default {
  name: 'FollowerComponent',
  props: {
    // Data from the stored follower
    follower: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
}
</script>

<style scoped>
.follower {
    border: 1px solid #111;
    padding: 20px;
    position: relative;
}
</style>

