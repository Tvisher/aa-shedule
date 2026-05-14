<template>
  <div class="calendar-container">
    <header class="calendar-header">
      <h1>Записи клиентов</h1>
      <button class="add-btn">
        <span>Добавить запись</span>
        <div class="plus-icon">+</div>
      </button>
    </header>

    <vue-cal
      v-model:view="activeView"
      :selected-date="selectedDate"
      :events="events"
      locale="ru"
      :time-from="8 * 60"
      :time-to="19 * 60"
      :time-step="60"
      :time-cell-height="120"
      :disable-views="['years', 'year']"
      class="vuecal--custom-theme"
    >
      <!-- Слот для заголовка дат -->
      <template #title="{ title, view }">
        <span v-if="view.id === 'week'">
          {{ formatWeekTitle(view.startDate, view.endDate) }}
        </span>
        <!-- Для режимов День и Месяц оставляем стандартный заголовок -->
        <span v-else>
          {{ title }}
        </span>
      </template>

      <!-- Слот для карточки события (День/Неделя) -->
      <template #event="{ event }">
        <div class="event-card">
          <div class="event-header">
            <span class="event-title">{{ event.title }}</span>
            <i class="icon-edit">✎</i>
          </div>
          <span class="event-client">{{ event.client }}</span>
          <div class="event-footer">
            <span class="event-time">
              {{ event.start.format("HH:mm") }} -
              {{ event.end.format("HH:mm") }}
            </span>
            <i class="icon-arrow">›</i>
          </div>
        </div>
      </template>

      <!-- Слот для ячейки (для кнопки + в пустых ячейках и счетчика в месяце) -->
      <template #cell-content="{ cell, view, events }">
        <div v-if="view === 'month'" class="month-cell">
          <span class="cell-day">{{ cell.content }}</span>
          <span v-if="events.length" class="cell-count"
            >{{ events.length }} записи</span
          >
          <span v-else class="cell-count empty">-</span>
        </div>

        <div v-if="view === 'week' && events.length === 0" class="add-slot">
          <div class="plus-circle">+</div>
        </div>
      </template>
    </vue-cal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

// Начальный вид и дата
const activeView = ref("week");
const selectedDate = ref(new Date(2026, 3, 14)); // Апрель 14, 2026

// Пример данных
const events = ref([
  {
    start: "2026-04-14 08:00",
    end: "2026-04-14 10:20",
    title: "Знакомство",
    client: "Иванов И. И.",
    special: false,
  },

  {
    start: "2026-04-14 11:00",
    end: "2026-04-14 13:20",
    title: "Знакомство",
    client: "Иванов И. И.",
    special: false,
  },
  {
    start: "2026-04-16 17:00",
    end: "2026-04-16 18:00",
    title: "Установочная встреча «Личный разбор»",
    client: "Иванов И. И.",
    special: true,
  },
]);

// Добавьте эту функцию к вашему коду в <script setup>
const formatWeekTitle = (start, end) => {
  if (!start || !end) return "";

  const monthStart = start.format("MMMM"); // Месяц начала (например, 'апрель')
  const monthEnd = end.format("MMMM"); // Месяц конца
  const yearStart = start.format("YYYY");
  const yearEnd = end.format("YYYY");

  // Функция для заглавной буквы (русская локаль возвращает месяцы со строчной)
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  // 1. Неделя в пределах одного месяца (самый частый случай: Апрель 13-19, 2026)
  if (monthStart === monthEnd) {
    return `${capitalize(monthStart)} ${start.format("D")}-${end.format("D")}, ${yearStart}`;
  }
  // 2. Неделя на стыке месяцев (например: Апрель 27 - Май 3, 2026)
  else if (yearStart === yearEnd) {
    return `${capitalize(monthStart)} ${start.format("D")} - ${capitalize(monthEnd)} ${end.format("D")}, ${yearStart}`;
  }
  // 3. Неделя на стыке годов (например: Декабрь 28, 2025 - Январь 3, 2026)
  else {
    return `${capitalize(monthStart)} ${start.format("D")}, ${yearStart} - ${capitalize(monthEnd)} ${end.format("D")}, ${yearEnd}`;
  }
};
</script>

<style lang="scss">
.vuecal__cell-date {
  height: 120px !important;
}

.vuecal--custom-theme {
  border-radius: 24px;
  background: #3c3c3c;
  box-shadow: 2.861px 2.861px 12.875px 1.431px rgba(0, 0, 0, 0.05);
  max-width: 1160px;
  margin: auto;
  padding: 5px;
  padding-top: 0;
}

.vuecal__menu {
  padding: 12px 0;
  flex-direction: row-reverse;
  gap: 6px;
}

.vuecal__view-btn {
  color: #f1eeee;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 60px;
  background-color: transparent;
  outline: none;
  border: none;
  &.vuecal__view-btn--active {
    background-color: #e15b00;
  }
}

.vuecal__event {
  padding: 0px 3px;
  background: transparent;
  color: #fff;
  display: flex;
}

.event-card {
  border-radius: 20px;
  background-color: #323232;
  padding: 11px 18px;
  width: 100%;
  height: 100%;
  box-shadow: 2.861px 2.861px 12.875px 1.431px rgba(0, 0, 0, 0.05);
}

.vuecal__title {
  color: #f1eeee;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.vuecal__title-bar {
  background: rgba(43, 43, 43, 0.6);
}
.vuecal__heading .weekday-label {
  background: #2b2b2b;
  color: #f1eeee;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.462px;
  padding: 8px 0;
}
.vuecal__body {
  padding-top: 4px;
}

.vuecal__cell--selected {
  background-color: initial;
}

.vuecal__weekdays-headings {
  padding: 0 !important;
  border: none;
}

.vuecal__cell:before,
.vuecal__time-column .vuecal__time-cell-line:before {
  display: none;
}

.vuecal__time-cell-label {
  height: calc(100% - 5px);
  display: flex;
  padding: 16px 5px;
  justify-content: center;
  border-radius: 20px;
  background: #2b2b2b;
  color: #f1eeee;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.462px;
}

.vuecal__time-column {
  display: flex;
  flex-direction: column;
}

// .vuecal--week-view {
.vuecal__time-column {
  width: 0;
  overflow: hidden;
  opacity: 0;
}
// }

.vuecal--day-view {
  .vuecal__time-column {
    opacity: 1;
    width: initial;
  }
}
</style>
