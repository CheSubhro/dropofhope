<script setup>
import { Phone, Mail, MapPin } from 'lucide-vue-next'

defineProps({ site: { type: Object, required: true } })
</script>

<template>
  <footer id="contact" class="border-t-4 border-[#E80E0E] bg-[#FFF5F5]">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
      <div>
        <p class="text-xl font-extrabold">
          <span class="text-[#E80E0E]">Drop</span><span class="text-slate-700">Of</span><span class="text-emerald-600">Hope</span>
        </p>
        <p class="mt-3 text-sm text-slate-600">{{ site.footer.tagline }}</p>

        <ul class="mt-5 space-y-2.5 text-sm text-slate-700">
          <li class="flex items-start gap-2.5">
            <Phone :size="16" class="mt-0.5 shrink-0 text-[#E80E0E]" />
            <a :href="`tel:${site.footer.contact.phone.replace(/\s/g, '')}`" class="hover:text-[#E80E0E]">
              {{ site.footer.contact.phone }}
            </a>
          </li>
          <li class="flex items-start gap-2.5">
            <Mail :size="16" class="mt-0.5 shrink-0 text-[#E80E0E]" />
            <a :href="`mailto:${site.footer.contact.email}`" class="break-all hover:text-[#E80E0E]">
              {{ site.footer.contact.email }}
            </a>
          </li>
          <li class="flex items-start gap-2.5">
            <MapPin :size="16" class="mt-0.5 shrink-0 text-[#E80E0E]" />
            <span>{{ site.footer.contact.address }}</span>
          </li>
        </ul>
      </div>

      <!-- Link columns -->
      <div v-for="col in site.footer.columns" :key="col.title">
        <h3 class="text-sm font-bold text-slate-900">{{ col.title }}</h3>
        <ul class="mt-4 space-y-2">
          <li v-for="l in col.links" :key="l.label">
            <RouterLink :to="l.to" class="text-sm text-slate-600 transition hover:text-[#E80E0E]">{{ l.label }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-[#E80E0E]/15 bg-[#E80E0E]/5">
      <div class="mx-auto grid max-w-7xl items-center gap-4 px-4 py-5 text-sm text-slate-600 sm:px-6 md:grid-cols-3 lg:px-8">
        <div class="flex items-center justify-center gap-3 md:justify-start">
          <a v-for="s in site.footer.socials" :key="s.id" :href="s.href" target="_blank" rel="noopener noreferrer"
             :aria-label="s.name"
             class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-[#E80E0E]/20 transition hover:bg-[#E80E0E] hover:text-white">
            <!-- Facebook -->
            <svg v-if="s.name === 'Facebook'" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
            </svg>
            <!-- Instagram -->
            <svg v-else-if="s.name === 'Instagram'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <!-- WhatsApp -->
            <svg v-else-if="s.name === 'WhatsApp'" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.2-.4.700-1.300.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.300-.2.300-.9.900-.9 2.200s.9 2.500 1.100 2.700c.1.200 1.800 2.800 4.400 3.900 1.600.7 2.300.8 3.100.7.500-.1 1.500-.6 1.700-1.200.2-.6.2-1.100.2-1.200-.1-.1-.3-.2-.5-.3Z" />
            </svg>
          </a>
        </div>

        <p class="text-center">© {{ new Date().getFullYear() }} {{ site.name }}. All rights reserved.</p>

        <ul class="flex items-center justify-center gap-5 md:justify-end">
          <li v-for="l in site.footer.legal" :key="l.label">
            <RouterLink :to="l.to" class="transition hover:text-[#E80E0E]">{{ l.label }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>