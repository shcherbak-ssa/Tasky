<template>
  <div class="bg-gray-50 w-screan min-h-screen relative overflow-hidden">
    <div class="header bg-gray-50 border-b-2 border-gray-200 flex items-center w-full">
      <div class="container flex items-center justify-between duration-200">
        <div class="flex items-center gap-6 relative">
          <BaseIcon icon="pi-bars" />

          <div class="flex items-center gap-4">
            <BaseSkeleton
              borderRadius="12px"
              width="3rem"
              height="3rem"
            />

            <div class="flex flex-col gap-3">
              <BaseSkeleton width="100px" />

              <div class="flex gap-4">
                <BaseSkeleton width="40px" />
                <BaseSkeleton width="40px" />
                <BaseSkeleton width="30px" />
                <BaseSkeleton width="60px" />
                <BaseSkeleton width="30px" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <BaseIcon icon="pi-search" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
