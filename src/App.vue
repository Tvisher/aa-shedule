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
  },

  {
    start: "2026-04-14 11:00",
    end: "2026-04-14 13:20",
    title: "Знакомство",
    client: "Иванов И. И.",
  },
  {
    start: "2026-04-16 17:00",
    end: "2026-04-16 18:00",
    title: "Установочная встреча «Личный разбор»",
    client: "Иванов И. И.",
  },

  {
    start: "2026-05-16 17:00",
    end: "2026-05-16 18:00",
    title: "Установочная встреча «Личный разбор»",
    client: "Иванов И. И.",
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

function formatRecordCount(count) {
  // Берем модуль числа на случай, если передадут отрицательное значение
  const n = Math.abs(count);

  // Получаем остаток от деления на 100 и на 10
  const mod100 = n % 100;
  const mod10 = n % 10;

  let word;

  // Сначала проверяем исключения второго десятка (11-14)
  if (mod100 >= 11 && mod100 <= 14) {
    word = "записей";
  }
  // Затем проверяем последнюю цифру
  else if (mod10 === 1) {
    word = "запись";
  } else if (mod10 >= 2 && mod10 <= 4) {
    word = "записи";
  } else {
    word = "записей";
  }

  return `${count} ${word}`;
}
</script>
<template>
  <div class="calendar-container container">
    <div class="shedule-head">
      <div class="shedule-head__title">Записи клиентов</div>
      <div class="shedule-head__btn">
        <span>Добавить запись</span>
        <span class="ico">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0005 4.83202L12.0005 12L4.83248 12"
              stroke="#E15B00"
              stroke-width="2"
            />
            <path
              d="M12.0005 19.168L12.0005 12L19.1685 12"
              stroke="#E15B00"
              stroke-width="2"
            />
          </svg>
        </span>
      </div>
    </div>
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
            <i class="icon-edit"></i>
          </div>
          <div class="event-footer">
            <div class="event-client">{{ event.client }}</div>
            <div class="event-time">
              {{ event.start.format("HH:mm") }} -
              {{ event.end.format("HH:mm") }}
            </div>
          </div>
        </div>
      </template>

      <template #cell-content="{ cell, view, events }">
        <div v-if="view.id === 'month'" class="month-cell">
          <div class="month-cell__wrapper">
            <div class="cell-day">{{ cell.content }}</div>
            <div v-if="events.length" class="cell-count">
              {{ formatRecordCount(events.length) }}
            </div>
            <div v-else class="cell-count">—</div>
          </div>
        </div>
      </template>
    </vue-cal>
  </div>
</template>

<style lang="scss">
.vuecal__cell--today {
  background-color: transparent;
}
.vuecal--month-view {
}

.vuecal--day-view .vuecal__time-column .vuecal__time-cell-line:before {
  display: none;
}
.vuecal__cell-date {
  height: 120px !important;
}

.vuecal--custom-theme {
  border-radius: 24px;
  background: #3c3c3c;
  box-shadow: 2.861px 2.861px 12.875px 1.431px rgba(0, 0, 0, 0.05);
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
  padding: 11px;
  width: 100%;
  height: 100%;
  text-align: initial;
  border: 2px solid #323232;
  display: flex;
  flex-direction: column;
}
.vuecal__event--focus,
.vuecal__event:focus {
  box-shadow: none;
}

.vuecal__event.vuecal__event--focus {
  .event-card {
    border-color: #e15b00;
    color: #e15b00;
  }
}
.vuecal__arrow i.angle {
  border-color: #fff;
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
  margin-right: -5px;
  margin-left: -5px;
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
  display: flex;
  align-items: center;
  gap: 8px;

  span:last-child {
    font-size: 14px;
    font-weight: 800;
    line-height: 100%;
  }
}
.vuecal__body {
  padding-top: 4px;
}

.vuecal__cell--selected {
  background:
    linear-gradient(
      0deg,
      rgba(225, 91, 0, 0.4) 0%,
      rgba(227, 111, 23, 0.4) 100%
    ),
    rgba(43, 43, 43, 0.3);
}

.vuecal--month-view {
  .vuecal__cell--selected {
    border-radius: 22px;
    .month-cell__wrapper {
      background: #e15b00;
    }
    .cell-count {
      border-color: #fff;
      color: #fff;
    }
  }
  .vuecal__cell:before {
    display: none;
  }
  .vuecal__weekdays-headings {
    padding-left: 0;
  }
}

.vuecal__weekdays-headings {
  padding-right: 0 !important;
  padding-left: 30px;
  border: none;
  background-color: #2b2b2b;
  margin-right: -7px;
  margin-left: -5px;
}

.vuecal__cell {
  &:before {
    border-top: none;
  }
  &:last-child {
    &:before {
      border-right: none;
    }
  }
  &:first-child {
    &:before {
      border-left: none;
    }
  }
}

.vuecal__time-cell:first-child .vuecal__time-cell-line:before,
.vuecal__time-cell:last-child .vuecal__time-cell-line:before {
  display: none;
}

.vuecal__time-cell-label {
  height: calc(100% - 10px);
  margin-top: 5px;
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

.vuecal--day-view {
  .vuecal__time-column {
    opacity: 1;
    width: initial;
  }
}

.month-cell {
  height: 110px;
  padding: 2px;
  .month-cell__wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 20px;
    background: #323232;
    box-shadow: 2.861px 2.861px 12.875px 1.431px rgba(0, 0, 0, 0.05);
    padding: 11px 18px;
    text-align: left;
  }

  .cell-day {
    color: #f1eeee;
    font-family: Unbounded;
    font-size: 42px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
  }
  .cell-count {
    border-top: 1px solid rgba(72, 72, 72, 0.6);
    padding-top: 10px;
    color: #e15b00;
    font-size: 12px;
    font-weight: 400;
  }
}
.event-header {
  padding-right: 16px;
  color: #f1eeee;
  font-size: 12px;
  font-weight: 700;
}
.event-footer {
  margin-top: auto;
}

.event-client {
  color: #f1eeee;
  font-size: 8px;
  font-weight: 400;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(72, 72, 72, 0.6);
}

.event-time {
  font-size: 12px;
  color: #e15b00;
  padding-top: 10px;
  padding-bottom: 5px;
}

.icon-edit {
  cursor: pointer;
  position: absolute;
  right: 11px;
  top: 11px;
  width: 18px;
  height: 18px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.9395 4.10352C11.5252 3.51783 12.4748 3.51783 13.0605 4.10352L13.8965 4.93945C14.4822 5.52522 14.4822 6.47478 13.8965 7.06055L8.0498 12.9072C7.85757 13.0995 7.61629 13.2368 7.35254 13.3027L4.62109 13.9854L3.8125 14.1875L4.01465 13.3789L4.69727 10.6475C4.7632 10.3837 4.90053 10.1424 5.09277 9.9502L10.9395 4.10352Z' stroke='%23E15B00'/%3e%3cpath d='M10.125 4.875L13.125 7.875' stroke='%23E15B00'/%3e%3c/svg%3e ");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.event-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  white-space: initial;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
