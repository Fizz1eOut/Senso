<template>
  <div class="link line">
    <slot/>
  </div>
</template>

<style scoped>
  .link {
    font-family: var(--ff-base);
    font-size: var(--fs-sm);
    font-weight: var(--fw-normal);
    color: var(--primary);
    transition: all color var(--transition-slow);
    cursor: pointer;
  }
  .link:hover {
    text-decoration: underline;
    color: var(--primary-hover);
  }
</style>
