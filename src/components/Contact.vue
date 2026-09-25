<template>
  <section id="contact" class="scroll-mt-20 py-20 lg:py-24">
    <div class="mx-auto max-w-[1200px] px-4 sm:px-6">
      <!-- One 28px panel split in two: the pitch on the left, the form on the right -->
      <div class="relative overflow-hidden rounded-panel border border-edge bg-band" data-aos="fade-up">
        <div class="pointer-events-none absolute -left-24 -top-32 h-80 w-80 rounded-full bg-accent-2 opacity-25 blur-3xl" aria-hidden="true"></div>

        <div class="relative grid grid-cols-1 lg:grid-cols-12">
          <div class="flex flex-col p-7 sm:p-10 lg:col-span-5 lg:border-r lg:border-edge lg:p-12">
            <h2 class="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink md:text-4xl lg:text-5xl">
              Let's work together
            </h2>
            <p class="mt-5 max-w-[42ch] text-base leading-relaxed text-muted">
              Have a project in mind or want to discuss potential opportunities? I'm always open to new challenges and collaborations.
            </p>

            <dl class="mt-10 text-sm">
              <div>
                <dt class="text-faint">Elsewhere</dt>
                <dd class="mt-2 flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/jenkins-chinwor/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    class="press inline-flex h-10 w-10 items-center justify-center rounded-full border border-edge bg-card text-muted transition-colors duration-200 hover:border-edge-strong hover:text-ink"
                  >
                    <Icon icon="tabler:brand-linkedin" class="text-xl" aria-hidden="true" />
                  </a>
                  <a
                    href="https://github.com/jchinwor"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    class="press inline-flex h-10 w-10 items-center justify-center rounded-full border border-edge bg-card text-muted transition-colors duration-200 hover:border-edge-strong hover:text-ink"
                  >
                    <Icon icon="tabler:brand-github" class="text-xl" aria-hidden="true" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div class="p-7 sm:p-10 lg:col-span-7 lg:p-12">
            <p
              v-if="successMessageSent && successMessage"
              role="status"
              class="mb-6 flex items-center gap-2 rounded-card border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400"
            >
              <Icon icon="tabler:circle-check" class="text-lg" aria-hidden="true" />
              {{ successMessage }}
            </p>
            <p
              v-if="errorMessage"
              role="alert"
              class="mb-6 flex items-center gap-2 rounded-card border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
            >
              <Icon icon="tabler:alert-circle" class="text-lg" aria-hidden="true" />
              {{ errorMessage }}
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-6" :key="formKey" novalidate>
              <div v-for="item in inputs" :key="item.id">
                <Input
                  v-model="form[item.id]"
                  :id="item.id"
                  :label="item.label"
                  :type="item.type"
                  :placeholder="item.placeholder"
                  :rows="item.rows"
                  :error="touched[item.id] ? errors[item.id] : ''"
                  @blur="markTouched(item.id)"
                  @input="validateField(item.id)"
                />
                <p v-if="touched[item.id] && errors[item.id]" :id="`${item.id}-error`" class="mt-2 text-sm text-red-500">
                  {{ errors[item.id] }}
                </p>
              </div>

              <Button type="submit" :label="showbtn ? 'Send message' : 'Sending'" :disabled="!showbtn" :icon="showbtn ? 'tabler:send' : ''" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from "./UI/Button.vue";
import Input from "./UI/Input.vue";
import { ref, nextTick } from "vue";
import { SendEmail } from "../services/emailServices";

const showbtn = ref(true);

const inputs = [
  { id: "email", label: "Your email", type: "email", placeholder: "email@example.com" },
  { id: "subject", label: "Subject", type: "text", placeholder: "Let us know how we can help" },
  { id: "message", label: "Message", type: "textarea", placeholder: "Leave a comment", rows: 6 },
];

const successMessageSent = ref(false);
const successMessage = ref("Email sent to sender");
const errorMessage = ref("");
const form = ref({ email: "", subject: "", message: "" });

const errors = ref({});
const touched = ref({});
const formKey = ref(0);

const markTouched = (field) => {
  touched.value[field] = true;
  validateField(field);
};

const validateField = (field) => {
  errors.value[field] = "";

  if (field === "email") {
    if (!form.value.email) {
      errors.value.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
      errors.value.email = "Enter a valid email.";
    }
  }
  if (field === "subject" && !form.value.subject) {
    errors.value.subject = "Subject is required.";
  }
  if (field === "message" && !form.value.message) {
    errors.value.message = "Message cannot be empty.";
  }
};

const validateForm = () => {
  Object.keys(form.value).forEach((field) => validateField(field));
  return !Object.values(errors.value).some((error) => error);
};

const handleSubmit = async () => {
  errorMessage.value = "";

  if (!validateForm()) {
    Object.keys(form.value).forEach((field) => (touched.value[field] = true));
    return;
  }

  showbtn.value = false;
  const requestBody = {
    email: form.value.email,
    subject: form.value.subject,
    message: form.value.message,
  };

  try {
    const response = await SendEmail(requestBody);
    if (response.status == 200) {
      successMessageSent.value = true;
      successMessage.value = response.data?.message || "Thanks! Your message has been sent.";
      setTimeout(() => { successMessage.value = ""; }, 10000);

      form.value = { email: "", subject: "", message: "" };
      formKey.value++;
      await nextTick();
      touched.value = {};
      errors.value = {};
    } else {
      errorMessage.value = "Something went wrong. Please try again.";
      console.error("Failed to send email:", response);
    }
  } catch (error) {
    errorMessage.value = "Could not send your message. Please try again or reach me on LinkedIn.";
    console.error("Error sending email:", error);
  } finally {
    showbtn.value = true;
  }
};
</script>
