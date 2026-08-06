<script lang="ts" setup>
const { t } = useI18n({
  useScope: 'local'
})

const faqs = computed(() => {
  return [
    { label: t("q_how_do_i_start_a_project"), content: t("r_how_do_i_start_a_project") },
    { label: t("q_project_duration"), content: t("r_project_duration") },
    { label: t("q_project_communication"), content: t("r_project_communication") },
    { label: t("q_payment_process"), content: t("r_payment_process") },
    // { label: t("q_can_i_incorporate"), content: t("r_can_i_incorporate") },
    { label: t("q_how_i_handle_changes"), content: t("r_how_i_handle_changes") },
    { label: t("q_can_i_train"), content: t("r_can_i_train") },
    { label: t("q_offer_additional_services"), content: t("r_offer_additional_services") },
    { label: t("q_provide_services_internationally"), content: t("r_provide_services_internationally") },
    // { label: t("q_project_management_tools"), content: t("r_project_management_tools") },
    // { label: t("q_customization_options"), content: t("r_customization_options") },
    // { label: t("q_what_if_not_happy_with_results"), content: t("r_what_if_not_happy_with_results") },
    // { label: t("q_refund_policy"), content: t("r_refund_policy") },
  ]
})
</script>

<template>
  <section id="faqs" class="my-12">
    <ProseH2>{{ $t('faqs') }}</ProseH2>
    <p class="mb-4">{{ t('intro') }}</p>
    <ClientOnly>
      <UAccordion 
        :items="faqs" 
        trailing-icon="i-lucide-chevron-right"
        :ui="{ 
          trigger: 'text-primary py-3 font-medium hover:no-underline',
          label: 'truncate',
          trailingIcon: 'size-5 transition-transform duration-200 group-data-[state=open]:rotate-90'
        }"
      >
        <template #body="{ item }">
          {{ item.content }}
        </template>
      </UAccordion>
    </ClientOnly> 
  </section>
</template>

<i18n lang="json">
  {
    "en": {
      "intro": "As we collaborate on your next project, it's essential to have a clear understanding of our process. Below, find answers to frequently asked questions.",
      "q_payment_process": "How does the payment process work?",
      "r_payment_process": "Once we agree on the service package, payment is structured as 25% upfront and the remaining 75% upon project completion. I also offer flexible payment plans for larger projects. The handoff will be done once the final payment is received.",
      "q_project_duration": "How long does a typical project take?",
      "r_project_duration": "A basic project can be completed in approximately 2-3 weeks, while more advanced projects may take 7-8 weeks, depending on the complexity and scope.",
      "q_can_i_incorporate": "Can I incorporate my existing content?",
      "r_can_i_incorporate": "Absolutely, either done by you or me! Plans include the integration of a specified amount of existing content by me, and I can discuss additional needs as part of our initial project scope.",
      "q_provide_services_internationally": "Do you provide services internationally?",
      "r_provide_services_internationally": "Yes, I work with clients globally and have the capability to manage projects across different time zones.",
      "q_offer_additional_services": "Do you offer additional services?",
      "r_offer_additional_services": "Yes, I also specialize in creating landing pages, content-rich websites, branding, design and video editing.",
      "q_can_i_train": "Can you train my team?",
      "r_can_i_train": "Yes, training sessions are a core part of the handoff process. I ensure your team is well-prepared to use and manage the new system effectively.",
      "q_how_i_handle_changes": "How do you handle changes after completion?",
      "r_how_i_handle_changes": "I can discuss ongoing service agreements that cover updates and modifications to your project as your business evolves.",
      "q_how_do_i_start_a_project": "How do we start a project with you?",
      "r_how_do_i_start_a_project": "The first step is a consultation call to discuss your needs and project scope. From there, I will provide a detailed proposal and timeline.",
      "q_project_management_tools": "What project management tools do you use?",
      "r_project_management_tools": "I use Notion to ensure a simple & transparent and effective management process.",
      "q_project_communication": "How do you handle project communication?",
      "r_project_communication": "I maintain regular communication via emails or other preferred options, scheduled calls, and updates on Notion to keep you informed at every stage.",
      "q_customization_options": "What customization options are available?",
      "r_customization_options": "From building interactive components, to building a full app like experience in the browser, Theming to match your brand, I can tailor your project to your exact needs.",
      "q_what_happens_if_the_project_changes_midway": "What happens if the project changes midway?",
      "r_what_happens_if_the_project_changes_midway": "I have flexible project management practices that can accommodate scope changes with prior agreement on new timelines and costs.",
      "q_what_if_not_happy_with_results": "What if I'm not happy with the results?",
      "r_what_if_not_happy_with_results": "If you're not happy, I'll continue refining the project until you're 100% satisfied under the condition that it is within the agreed project scope.",
      "q_refund_policy": "Do you have refund policy?",
      "r_refund_policy": "I don't offer refunds, but if you decide for whatever reason to quit the project midway, I will charge you just for the work done until that point."
    },
    "es": {
      "intro": "Al colaborar en tu próximo proyecto, es importante tener una comprensión clara del proceso. A continuación, contesto respuestas frecuentes.",
      "q_payment_process": "¿Cómo funciona el proceso de pago?",
      "r_payment_process": "Una vez que acordamos el paquete de servicios, el pago se estructura en un 25 % por adelantado y el 75 % restante al finalizar el proyecto. También ofrezco planes de pago flexibles para proyectos más grandes. La transferencia se realizará una vez que se reciba el pago final.",
      "q_project_duration": "¿Cuánto tiempo lleva un proyecto típico?",
      "r_project_duration": "Un proyecto básico se puede completar en aproximadamente 2 a 3 semanas, mientras que los proyectos más complejos pueden tardar entre 7 y 8 semanas, dependiendo de la complejidad y el alcance.",
      "q_can_i_incorporate": "¿Puedo incorporar mi contenido existente?",
      "r_can_i_incorporate": "¡Absolutamente, ya sea hecho por usted o por mí! Los planes incluyen la integración de una cantidad específica de contenido existente por mi parte, y podemos discutir necesidades adicionales como parte del alcance de nuestro proyecto inicial.",
      "q_provide_services_internationally": "¿Proporciona servicios a nivel internacional?",
      "r_provide_services_internationally": "Sí, trabajo con clientes a nivel mundial y tengo la capacidad de gestionar proyectos en diferentes zonas horarias.",
      "q_offer_additional_services": "¿Ofrece servicios adicionales?",
      "r_offer_additional_services": "Sí, también me especializo en la creación de páginas de destino, sitios web ricos en contenido, branding, diseño y edición de videos.",
      "q_can_i_train": "¿Puedes entrenar a mi equipo?",
      "r_can_i_train": "Sí, las sesiones de capacitación son una parte central del proceso de transferencia. Me aseguro de que su equipo esté bien preparado para usar y administrar el nuevo sistema de manera efectiva.",
      "q_how_i_handle_changes": "¿Cómo manejas los cambios una vez finalizados?",
      "r_how_i_handle_changes": "Puedo discutir acuerdos de servicio que cubren actualizaciones y modificaciones de su proyecto a medida que su negocio evoluciona.",
      "q_how_do_i_start_a_project": "¿Cómo iniciamos un proyecto contigo?",
      "r_how_do_i_start_a_project": "El primer paso es una llamada de consulta para analizar sus necesidades y el alcance del proyecto. A partir de ahí, le proporcionaré una propuesta detallada y un cronograma.",
      "q_project_management_tools": "¿Qué herramientas de gestión de proyectos utilizas?",
      "r_project_management_tools": "Utilizo Notion para garantizar un proceso de gestión simple, transparente y eficaz.",
      "q_project_communication": "¿Cómo manejas la comunicación del proyecto?",
      "r_project_communication": "Mantengo comunicación regular a través de correos electrónicos u otras opciones preferidas, llamadas programadas y actualizaciones en Notion para mantenerlo informado en cada etapa.",
      "q_customization_options": "¿Qué opciones de personalización están disponibles?",
      "r_customization_options": "Desde la creación de componentes interactivos hasta la creación de una experiencia similar a una aplicación en el navegador, identidad visual que coincida con su marca, puedo adaptar su proyecto a sus necesidades exactas.",
      "q_what_happens_if_the_project_changes_midway": "¿Qué pasa si el proyecto cambia a mitad de camino?",
      "r_what_happens_if_the_project_changes_midway": "Soy flexible a adaptarme a cambios mediante un acuerdo previo acordando nuevos cronogramas y costos.",
      "q_what_if_not_happy_with_results": "¿Qué pasa si no estoy satisfecho con los resultados?",
      "r_what_if_not_happy_with_results": "Si no estás satisfecho, continuaré refinando el proyecto hasta que estés 100% satisfecho bajo la condición de que esté dentro del alcance acordado del proyecto.",
      "q_refund_policy": "¿Tiene una política de reembolso?",
      "r_refund_policy": "No ofrezco reembolsos, pero si por cualquier motivo decides abandonar el proyecto a mitad de camino, te cobraré sólo por el trabajo realizado hasta ese momento."
    }
  }
</i18n>