# User Story Guidelines

This document defines the rules and format for creating user stories in this project.

---

## File Naming Convention

```
US-{number}-{phase}-{short-title}.md
```

**Examples:**
- `US-001-1.1-theme-configuration.md`
- `US-017-1.2-user-registration.md`
- `US-025-2.1-grammar-template.md`

**Rules:**
- Number: 3-digit sequential number (001, 002, etc.)
- Phase: matches the implementation phase (1.1, 1.2, 2.1, etc.)
- Short title: lowercase, hyphen-separated, descriptive

---

## Story File Structure

Each user story file must contain the following sections in order:

### 1. Title
```markdown
# US-{id}: {Title}
```

### 2. Story Statement
```markdown
## Story

**As a** {user role}
**I want to** {action/feature}
**So that** {benefit/value}
```

**User roles in this project:**
- `visitor` - unauthenticated user viewing public pages
- `user` - authenticated learner
- `admin` - content manager
- `developer` - for technical/infrastructure stories

### 3. Description
```markdown
## Description

{1-3 paragraphs explaining what the feature is and why it's needed}
```

### 4. Acceptance Criteria
```markdown
## Acceptance Criteria

- [ ] {Criterion 1}
- [ ] {Criterion 2}
- [ ] ...
```

**Rules for acceptance criteria:**
- Use checkbox format `- [ ]`
- Each criterion should be independently verifiable
- Be specific and measurable
- Include both functional and non-functional requirements
- Group related criteria together
- Include file paths where components should be created

### 5. Technical Notes
```markdown
## Technical Notes

**Libraries:**
- {library} - {components/functions used}

**File location:** `{path/to/file.tsx}`

{Additional technical details, code snippets, or specifications}
```

**Include:**
- Required npm packages
- File paths
- Component/function names
- Data structures or interfaces
- Styling specifications (colors, sizes, spacing)
- Responsive breakpoints

### 6. UI/UX Requirements (for frontend stories)
```markdown
## UI/UX Requirements

- {Requirement 1}
- {Requirement 2}
- ...
```

**Include:**
- Layout behavior
- Responsive design rules
- Spacing and padding values
- Color usage
- Typography variants
- Interactive states (hover, focus, etc.)

### 7. Content (if applicable)
```markdown
## Content

| Field | Value |
|-------|-------|
| ... | ... |
```

Use tables for:
- Text content (especially translations)
- Data structures
- Configuration values

### 8. Dependencies (if applicable)
```markdown
## Dependencies

Requires completion of:
- {US-XXX} ({Title})
- ...
```

### 9. Notes
```markdown
## Notes

- {Additional context}
- {Edge cases}
- {Future considerations}
```

---

## Content Rules

### Language
- UI text for this project is in **Ukrainian**
- Technical documentation is in **English**
- Include Ukrainian text content in tables or code blocks

### Scope
- Each story should take **no more than 4 hours** to implement
- If larger, break into smaller stories
- One story = one logical unit of work

### Specificity
- Be specific about requirements
- Do NOT include copy-paste implementation code
- DO include:
  - Library/component names to use
  - Styling values (colors, spacing, sizes)
  - Text content
  - Data structures
  - File paths

### What NOT to Include
- Full implementation code
- Boilerplate code
- Import statements
- Complete component implementations

### What TO Include
- Component names and their purpose
- Props interfaces (structure, not full code)
- Styling specifications
- MUI component names to use
- Responsive breakpoint behavior
- Sample data structures

---

## Index File Updates

When creating new stories, update `index.md`:

1. Add row to the phase table:
```markdown
| [US-XXX-X.X](./US-XXX-X.X-title.md) | Title | Description | Not Started |
```

2. Add to implementation order section (if new phase)

3. Update status as work progresses:
- `Not Started`
- `In Progress`
- `Completed`

---

## Example Template

```markdown
# US-XXX-X.X: Feature Title

## Story

**As a** {role}
**I want to** {action}
**So that** {benefit}

---

## Description

{Description of the feature}

---

## Acceptance Criteria

- [ ] Create component at `{path}`
- [ ] {Functional requirement}
- [ ] {Visual requirement}
- [ ] {Responsive requirement}

---

## Technical Notes

**Libraries:**
- `@mui/material` - {components}
- `react-router-dom` - {hooks/components}

**File location:** `apps/web/src/{path}`

**Specifications:**
| Property | Value |
|----------|-------|
| ... | ... |

---

## UI/UX Requirements

- {Layout requirement}
- {Spacing requirement}
- {Responsive behavior}

---

## Content

| Element | Text |
|---------|------|
| ... | ... |

---

## Dependencies

Requires completion of:
- US-XXX-X.X ({Title})

---

## Notes

- {Additional context}
```

---

## Checklist Before Submitting Story

- [ ] File name follows convention: `US-{number}-{phase}-{title}.md`
- [ ] Story statement uses correct format (As a / I want to / So that)
- [ ] Acceptance criteria are checkboxes
- [ ] Technical notes include libraries and file paths
- [ ] UI/UX requirements cover responsive behavior
- [ ] Content is in correct language (Ukrainian for UI, English for docs)
- [ ] Story scope is under 4 hours
- [ ] No copy-paste code included
- [ ] Index file updated with new story

---

*Document Version: 1.0*
