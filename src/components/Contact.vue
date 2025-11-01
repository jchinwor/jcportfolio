<template>
  <section class="mt-32" id="contact">
    <SectionHeader title="Contact Me" />
    <div class="py-8 px-4 lg:py-16 mx-auto max-w-screen-md">
      <h3 class="text-center font-bold dark:text-[#86868b]">
        Let's Work Together
      </h3>
      <p class="text-center py-2 dark:text-gray-300">
        Have a project in mind or want to discuss potential opportunities? I'm
        always open to new challenges and collaborations.
      </p>
      <p v-if="successMessageSent" class="text-green-500 text-center text-sm">
        {{ successMessage }}
      </p>
      <form @submit.prevent="handleSubmit" class="space-y-8" :key="formKey">
        <div v-for="(item, index) in inputs" :key="index">
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
          <p
            v-if="touched[item.id] && errors[item.id]"
            class="text-red-500 text-sm"
          >
            {{ errors[item.id] }}
          </p>
        </div>
        <div class="flex justify-between">
          <Button v-if="showbtn" type="submit" label="Send" />
          <Button v-else type="submit" label="Sending" disabled />
          <div class="mt-2 flex justify-center space-x-3 md:space-x-8">
            <!-- <a href="" class="text-gray-600 hover:text-blue-500">
              <Icon icon="fa-brands:twitter" style="font-size: 2rem" />
            </a> -->
            <a href="https://www.linkedin.com/in/jenkins-chinwor/" class="text-gray-600 hover:text-blue-500">
              <Icon icon="fa-brands:linkedin" style="font-size: 2rem" />
            </a>
            <a href="" class="text-gray-600 hover:text-gray-800">
              <Icon icon="fa-brands:github" style="font-size: 2rem" />
            </a>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from "./UI/SectionHeader.vue";
import Button from "./UI/Button.vue";
import Input from "./UI/Input.vue";
import { ref, nextTick  } from "vue";
import { SendEmail } from "../services/emailServices";

const showbtn = ref(true)
// Define form fields
const inputs = ref([
  {
    id: "email",
    label: "Your email",
    type: "email",
    placeholder: "email@example.com",
  },
  {
    id: "subject",
    label: "Subject",
    type: "text",
    placeholder: "Let us know how we can help",
  },
  {
    id: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Leave a comment",
    rows: 6,
  },
]);

const successMessageSent = ref(false);
const successMessage = ref("Email sent to sender");
const form = ref({
  email: "",
  subject: "",
  message: "",
});

const errors = ref({});
const touched = ref({});
const formKey = ref(0);

// Mark a field as touched when it loses focus
const markTouched = (field) => {
  touched.value[field] = true;
  validateField(field);
};

// Validate a single field
const validateField = (field) => {
  errors.value[field] = ""; // Reset error

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

// Validate the entire form before submission
const validateForm = () => {
  Object.keys(form.value).forEach((field) => validateField(field));
  return !Object.values(errors.value).some((error) => error);
};

const handleSubmit = async () => {
  
  if (validateForm()) {

    showbtn.value = !showbtn.value
        const requestBody = {
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message,
      };
    // for (let [key, value] of formData.entries()) {
    //     console.log(key, value);
    //   }

    try {
      const response = await SendEmail(requestBody);
      if (response.status == 200) {
        successMessageSent.value = true;
        successMessage.value = response.data.message;

        setTimeout(() => {
          successMessage.value = ""
        }, 10000);
        showbtn.value = true
         // Clear the form
         form.value = {
          email: "",
          subject: "",
          message: "",
        };

         // ✅ Force Vue to detect changes
         formKey.value++;
         await nextTick(); 
        // Reset touched and errors
        touched.value = {};
        errors.value = {};
      } else {
        showbtn.value = !showbtn.value
        console.error("Failed to send email:", response);
      }
    } catch (error) {
      showbtn.value = !showbtn.value
      console.error("Error sending email:", error);
    }
    
  } else {
    Object.keys(form.value).forEach((field) => (touched.value[field] = true));
  }
};
</script>
