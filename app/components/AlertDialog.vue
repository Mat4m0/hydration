<script setup lang="ts">
  import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogRoot,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from 'reka-ui'
  </script>
  
  <template>
    <AlertDialogRoot>
      <AlertDialogTrigger />
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogTitle />
          <AlertDialogDescription />
          <AlertDialogCancel />
          <AlertDialogAction />
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialogRoot>
  </template>