# Hydration Errors Summary

This document summarizes all components causing hydration attribute mismatches in the application. The errors occur because `reka-ui` generates IDs with different version numbers during server-side rendering (SSR) versus client-side hydration.

## Root Causes

### 1. ID Generation Counter Mismatch
The `reka-ui` library uses an internal counter to generate unique IDs for components. This counter differs between server and client renders, causing ID mismatches like:
- Server: `reka-*-v-3-0-0`
- Client: `reka-*-v-2-0-0`

This suggests that components are being rendered in a different order or some components are conditionally rendered between server and client.

### 2. Whitespace Character Encoding Mismatch
Date field components render literal segments with whitespace characters. The server renders non-breaking spaces (` `) while the client expects regular spaces (` `), causing text content mismatches during hydration.

## Affected Components

### 1. Collapsible Component
**File:** `app/components/Collapsible.vue`

**Error Pattern:**
- Server ID: `reka-collapsible-content-v-3-0-0`
- Client ID: `reka-collapsible-content-v-2-0-0`
- Difference: Version counter offset by 1

**Affected Elements:**
- `CollapsibleContent` (1 instance)

---

### 2. Accordion Component
**File:** `app/components/Accordion.vue`

**Error Pattern:**
- Server IDs: `reka-accordion-trigger-v-1-0-X` and `reka-collapsible-content-v-1-0-X`
- Client IDs: `reka-accordion-trigger-v-0-0-X` and `reka-collapsible-content-v-0-0-X`
- Difference: Version counter offset by 1

**Affected Elements:**
- `AccordionTrigger` (3 instances: items 0, 2, 4)
- `AccordionContent` (3 instances: items 1, 3, 5)

**Total Errors:** 6 (3 triggers + 3 content elements)

---

### 3. Listbox Component
**File:** `app/components/Listbox.vue`

**Error Pattern:**
- Server ID: `reka-listbox-item-v-9-0-X`
- Client ID: `reka-listbox-item-v-8-0-X`
- Difference: Version counter offset by 1

**Affected Elements:**
- `ListboxItem` (20 instances: items 0-19)

**Total Errors:** 20

---

### 4. DropdownMenu Component
**File:** `app/components/DropdownMenu.vue`

**Error Pattern:**
- Server ID: `reka-dropdown-menu-trigger-v-7-0-0`
- Client ID: `reka-dropdown-menu-trigger-v-6-0-0`
- Difference: Version counter offset by 1

**Affected Elements:**
- `DropdownMenuTrigger` (1 instance)

---

### 5. MenuBar Component
**File:** `app/components/MenuBar.vue`

**Error Pattern:**
- Server ID: `reka-v-10-0-X`
- Client ID: `reka-v-9-0-X`
- Difference: Version counter offset by 1

**Affected Elements:**
- `MenubarTrigger` (3 instances: items 1, 3, 5)

**Total Errors:** 3

---

### 6. DateField Component
**File:** `app/components/DateField.vue`

**Error Type:** Text Content Mismatch

**Error Pattern:**
- Server renders: Non-breaking space (` `)
- Client expects: Regular space (` `)
- Difference: Whitespace character encoding mismatch

**Affected Elements:**
- `DateFieldLiteral` (1 instance)

**Total Errors:** 1

---

### 7. DateRangeField Component
**File:** `app/components/DateRangeField.vue`

**Error Type:** Text Content Mismatch

**Error Pattern:**
- Server renders: Non-breaking space (` `)
- Client expects: Regular space (` `)
- Difference: Whitespace character encoding mismatch

**Affected Elements:**
- `DateRangeFieldInput` with `type="start"` (1 instance - literal segment)
- `DateRangeFieldInput` with `type="end"` (1 instance - literal segment)

**Total Errors:** 2

---

### 8. DatePicker Component
**File:** `app/components/DatePicker.vue`

**Error Types:** 
1. Text Content Mismatch
2. Attribute Mismatch

**Error Patterns:**
1. **Text Mismatch:**
   - Server renders: Non-breaking space (` `)
   - Client expects: Regular space (` `)
   - Difference: Whitespace character encoding mismatch

2. **ID Mismatch:**
   - Server ID: `reka-popover-trigger-v-3-0-0`
   - Client ID: `reka-popover-trigger-v-2-0-0`
   - Difference: Version counter offset by 1

**Affected Elements:**
- `DatePickerInput` with `part="literal"` (1 instance - text mismatch)
- `DatePickerTrigger` (1 instance - ID mismatch)

**Total Errors:** 2 (1 text + 1 attribute)

---

## Summary Statistics

| Component | Total Errors | Error Type | Version/Content Offset |
|-----------|--------------|------------|------------------------|
| Collapsible | 1 | Attribute (ID) | +1 |
| Accordion | 6 | Attribute (ID) | +1 |
| Listbox | 20 | Attribute (ID) | +1 |
| DropdownMenu | 1 | Attribute (ID) | +1 |
| MenuBar | 3 | Attribute (ID) | +1 |
| DateField | 1 | Text Content | Non-breaking space vs space |
| DateRangeField | 2 | Text Content | Non-breaking space vs space |
| DatePicker | 2 | Text Content + Attribute (ID) | Non-breaking space vs space / +1 |
| **Total** | **36** | - | - |

## Impact

- **Development:** Console warnings during hydration
- **Production:** Warnings are suppressed, but hydration mismatches can cause:
  - Potential accessibility issues (ARIA attributes may not match)
  - Reactivity issues if IDs are used for component references
  - SEO concerns if IDs are used in semantic HTML
  - Visual inconsistencies if text content differs (whitespace rendering)
  - Potential layout shifts if whitespace differences affect text rendering

## Notes

- **ID Mismatches:** All ID errors follow the same pattern: server-side IDs have a version number that is 1 higher than client-side IDs. This suggests that one additional component instance is being counted during SSR that isn't present during client hydration (or vice versa). The offset is consistent across all affected components, indicating a global counter issue in the `reka-ui` library.

- **Text Content Mismatches:** Date field literal segments show whitespace encoding differences. The server renders non-breaking spaces (U+00A0) while the client expects regular spaces (U+0020). This is likely due to how the `reka-ui` library handles literal segment rendering differently between SSR and client-side hydration.
