<script lang="ts" setup>
const { t } = useI18n({
  useScope: 'local'
})

const faqs = computed(() => {
  return [
    { label: t("q_what_projects"), content: t("r_what_projects") },
    { label: t("q_design_and_code"), content: t("r_design_and_code") },
    { label: t("q_team_collaboration"), content: t("r_team_collaboration") },
    { label: t("q_remote_work"), content: t("r_remote_work") },
    { label: t("q_project_scope"), content: t("r_project_scope") },
    { label: t("q_how_to_start"), content: t("r_how_to_start") },
  ]
})
</script>

<template>
  <section id="faqs" class="my-12 not-prose">
    <div class="space-y-4">
      <div class="space-y-1">
        <ProseH2>
          {{ $t('faqs') }}
        </ProseH2>
        <ProseP class="text-xs text-muted mb-0">
          {{ t('intro') }}
        </ProseP>
      </div>

      <ClientOnly>
        <UAccordion 
          :items="faqs" 
          trailing-icon="i-lucide-chevron-right"
          :ui="{ 
            trigger: 'text-primary',
            body: 'leading-relaxed',
            trailingIcon: 'size-4 transition-transform duration-200 group-data-[state=open]:rotate-90'
          }"
        >
          <template #body="{ item }">
            {{ item.content }}
          </template>
        </UAccordion>
      </ClientOnly> 
    </div>
  </section>
</template>

<i18n lang="json">
  {
    "en": {
      "intro": "Direct answers on collaboration, multidisciplinary capabilities, and workflow.",
      "q_what_projects": "What kind of projects do you take on?",
      "r_what_projects": "Brand identities, digital products, high-performance web applications, motion design, 3D visualization, and interactive experiences — especially projects that benefit from bridging visual craft with engineering.",
      "q_design_and_code": "Can you handle both design and front-end development?",
      "r_design_and_code": "Yes. My core advantage is taking an idea from visual concept, wireframing, and UI/UX design directly into robust, production-ready front-end code (Nuxt, Vue, Tailwind, Three.js/GLSL) without design fidelity lost in translation.",
      "q_team_collaboration": "Do you collaborate with existing teams or other designers?",
      "r_team_collaboration": "Absolutely. I frequently partner with in-house product teams, agencies, animators, and backend developers as a creative lead or specialized design technologist.",
      "q_remote_work": "Do you work internationally / remotely?",
      "r_remote_work": "Yes. I am based in Buenos Aires (UTC-3) and collaborate seamlessly with clients and studios across North America, Europe, and Latin America.",
      "q_project_scope": "Can I hire you for a focused or smaller task?",
      "r_project_scope": "Yes. Project scope ranges from specialized consulting, motion sequences, or shader development to full-cycle digital platforms and brand overhauls.",
      "q_how_to_start": "How do we start working together?",
      "r_how_to_start": "Send a short message with your project overview, timeline, or key objectives. We will schedule a brief introductory call to review scope and discuss next steps."
    },
    "es": {
      "intro": "Respuestas directas sobre colaboración, capacidades multidisciplinarias y flujo de trabajo.",
      "q_what_projects": "¿Qué tipo de proyectos realizás?",
      "r_what_projects": "Identidades de marca, aplicaciones web de alta performance, productos digitales, motion graphics, visualización 3D y experiencias interactivas — especialmente proyectos que se benefician de unir diseño y desarrollo.",
      "q_design_and_code": "¿Podés encargarte tanto del diseño como del desarrollo?",
      "r_design_and_code": "Sí. Mi mayor diferencial es llevar una idea desde el concepto visual, wireframes y diseño UX/UI directamente hasta el código front-end (Nuxt, Vue, Tailwind, Three.js/GLSL), sin perder calidad ni fidelidad de diseño.",
      "q_team_collaboration": "¿Trabajás con equipos existentes o agencias?",
      "r_team_collaboration": "Totalmente. Colaboro con regularidad con equipos internos de producto, agencias creativas, animadores y desarrolladores backend como líder creativo o implementador técnico.",
      "q_remote_work": "¿Trabajás de forma remota / internacional?",
      "r_remote_work": "Sí. Resido en Buenos Aires (UTC-3) y trabajo con clientes y estudios en Norteamérica, Europa y Latinoamérica.",
      "q_project_scope": "¿Se te puede contratar para proyectos acotados o específicos?",
      "r_project_scope": "Sí. El alcance puede ir desde una animación puntual o shader específico hasta la construcción de una plataforma digital o identidad integral.",
      "q_how_to_start": "¿Cómo empezamos un proyecto?",
      "r_how_to_start": "Escribime un mensaje con un resumen de tu proyecto, objetivos y tiempos estimados. Coordinamos una llamada breve para revisar el alcance y definir los próximos pasos."
    }
  }
</i18n>