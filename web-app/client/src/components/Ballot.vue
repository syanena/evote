<template>
    <div class="container" id="todo">
			
			<section class="panel">	

				<input type="checkbox" id="mark-all" @click="selectAll" :checked="areAllSelected">
				<input v-model="newTask" @keyup.enter="addTask" placeholder="What do you need to do?" autofocus class="text-input">
				<button @click="clearList">Clear List</button>

			</section>

			<section class="list">

				<ul class="list-item">

					<li v-for="task in tasks" :class="{done: isChecked(task)}">

						<input type="checkbox" class="checkbox" @click="check" v-model="task.checked">
						
						<input type="text" v-if="task === editingTask" v-auto-focus class="text-input" @keyup.enter="endEditing(task)" @blur="endEditing(task)" v-model="task.text">

						<label for="checkbox" v-if="task !== editingTask" @dblclick="editTask(task)">{{ task.text }}</label>
						
						<button class="delete" @click="removeTask(task)">X</button>

					</li>
				
				</ul>
			
			</section>

	</div>
	
	<!-- <div class="credit">
			<p>Use the input field at the bottom to add an item (press Enter)</p>
			<p>Double click on the text to edit it (press Enter to save)</p>
			<p>Hover on the item and click "X" to delete it</p>
			<p>Created by <a href="http://ayoisaiah.com">Ayo Isaiah</a> using <a href="https://vuejs.org">Vue.js</a></p>
	</div> -->
</template>
<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
    
}
</script>
<style >

</style>