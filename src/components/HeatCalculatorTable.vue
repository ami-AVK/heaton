<template>
  <div class="heat-calculator">
    <div class="mb-4">
      <label class="block mb-2">
        Температура теплоносителя (°C):
        <input type="number" v-model="waterTemp" class="border p-2 rounded" />
      </label>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse border">
        <thead>
          <tr>
            <th class="border p-2">Длина/Высота</th>
            <th v-for="height in heights" :key="height" class="border p-2">
              {{ height }} мм
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="length in lengths" :key="length">
            <td class="border p-2">{{ length }} мм</td>
            <td v-for="height in heights" :key="height" class="border p-2">
              {{ calculateHeatOutput(length, height) }} Вт
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCategoryProducts, getUniqueFieldValues } from '../utils/productUtils';

const currentModel = ref('');
const currentType = ref('');
const waterTemp = ref(75);
const heights = ref<number[]>([]);
const lengths = ref<number[]>([]);
const products = ref([]);

onMounted(() => {
  // Listen for model and type changes from Astro
  window.addEventListener('modelChanged', ((e: CustomEvent) => {
    currentModel.value = e.detail.model;
    updateDimensions();
  }) as EventListener);

  window.addEventListener('typeChanged', ((e: CustomEvent) => {
    currentType.value = e.detail.type;
    updateDimensions();
  }) as EventListener);
});

function updateDimensions() {
  if (!currentModel.value) return;
  
  const products = getCategoryProducts("Стальные панельные радиаторы");
  heights.value = getUniqueFieldValues("Стальные панельные радиаторы", 'Высота, мм', currentModel.value) as number[];
  lengths.value = getUniqueFieldValues("Стальные панельные радиаторы", 'Длина, мм', currentModel.value) as number[];
}

function calculateHeatOutput(length: number, height: number): number {
  // Add your heat output calculation logic here
  // This is a placeholder calculation
  const baseOutput = (length * height) / 1000;
  const tempFactor = (waterTemp.value - 20) / 50; // Adjust based on water temperature
  return Math.round(baseOutput * tempFactor);
}
</script>