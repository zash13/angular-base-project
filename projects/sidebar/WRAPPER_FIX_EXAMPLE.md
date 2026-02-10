<!-- BEFORE (Problematic) -->
<div class="flex flex-1 overflow-hidden pt-16">
    <div
      class="h-full transition-all duration-300 border-r border-gray-200 bg-white overflow-y-auto"
      [style.width.px]="getSidebarWidth()"
    >
      <lib-sidebar
        [darkMode]="true"
        <!-- other props -->
      ></lib-sidebar>
    </div>
</div>

<!-- AFTER (Fixed) -->
<div class="flex flex-1 overflow-hidden pt-16">
    <div
      class="h-full transition-all duration-300 overflow-y-auto"
      [style.width.px]="getSidebarWidth()"
    >
      <lib-sidebar
        [darkMode]="true"
        <!-- other props -->
      ></lib-sidebar>
    </div>
</div>