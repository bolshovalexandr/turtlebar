<template>
	<TurtleLayout />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TurtleLayout from './components/TurtleLayout.vue';

export default defineComponent({
	name: 'App',
	components: { TurtleLayout }
});
</script>
