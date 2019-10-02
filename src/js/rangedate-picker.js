<template>
  <div class="calendar-root">
    
    
    <div class="input-date" @click="toggleCalendar()"> {{getDateString(dateRange.start, 'DD.M.YYYY')}}
     <span v-if="!(Object.entries(dateRange).length === 0 && dateRange.constructor === Object)">  <i class="right-to inside-input"></i>  </span>
     <span class="c-input-placeholder" v-else > Select Range </span>
       {{getDateString(dateRange.end, 'DD.M.YYYY')}}
    </div>
    
        <div class="filters-bg" v-if="isOpen" @click="toggleCalendar()"></div>
    
    
        <div class="calendar" :class="{'calendar-mobile ': isCompact, 'calendar-right-to-left': isRighttoLeft}" v-if="isOpen">
      <!--      <div class="calendar-head" v-if="!isCompact">-->
      <!--        <h2>{{captions.title}}</h2>-->
      <!--        <i class="close" @click="toggleCalendar()">&times</i>-->
      <!--      </div>-->
      
            <div class="calendar-range" :class="{'calendar-range-mobile ': isCompact}" v-if="!showMonth || !isCompact">
        <ul class="calendar_preset">
          <li
            class="calendar_preset-ranges"
            v-for="(item, idx) in finalPresetRanges"
            :key="idx"
            @click="updatePreset(item)"
            :class="{'active-preset': presetActive === item.label}">
            <input class="checkbox__input" :id="item.label" :value="item.label" v-model="current_menu_label" type="radio">
            <label class="checkbox__label" :for="item.label">{{item.label}}</label>
          </li>
          <li class="calendar_preset-ranges active-preset">
            Date from-to <i class="right-to"></i>
          </li>
          
<!--          <li class="d-md-none">-->
<!--          <li>  <button class="btn-sm btn-secondary calendar-btn-cancel" @click="clearDateValue()">Submit</button></li>-->
<!--          </li>-->
        </ul>
      </div>
      <div class="">
        <div class="calendar-wrap">
  
        <div class="calendar_month_left" :class="{'calendar-left-mobile': isCompact}" v-if="showMonth">
            <div class="months-text">
              <i class="left" @click="goPrevMonth"><</i>
              <i class="right" @click="goNextMonth" v-if="isCompact">></i>
              {{monthsLocale[activeMonthStart] +' '+ activeYearStart}}
            </div>
            <ul :class="s.daysWeeks">
              <li v-for="item in shortDaysLocale" :key="item">{{item}}</li>
            </ul>
            <ul v-for="r in 6" :class="[s.days]" :key="r">
              <li :class="[{[s.daysSelected]: isDateSelected(r, i, 'first', startMonthDay, endMonthDate),
              [s.daysInRange]: isDateInRange(r, i, 'first', startMonthDay, endMonthDate),
              [s.dateDisabled]: isDateDisabled(r, i, startMonthDay, endMonthDate)}]" v-for="i in numOfDays" :key="i"
                  v-html="getDayCell(r, i, startMonthDay, endMonthDate)"
                  @click="selectFirstItem(r, i)"></li>
            </ul>
  
          </div>
          <div class="calendar_month_right" v-if="!isCompact">
            <div class="months-text">
              {{monthsLocale[startNextActiveMonth] +' '+ activeYearEnd}}
              <i class="right" @click="goNextMonth">></i>
            </div>
            <ul :class="s.daysWeeks">
              <li v-for="item in shortDaysLocale" :key="item">{{item}}</li>
            </ul>
            <ul v-for="r in 6" :class="[s.days]" :key="r">
              <li :class="[{[s.daysSelected]: isDateSelected(r, i, 'second', startNextMonthDay, endNextMonthDate),
            [s.daysInRange]: isDateInRange(r, i, 'second', startNextMonthDay, endNextMonthDate),
            [s.dateDisabled]: isDateDisabled(r, i, startNextMonthDay, endNextMonthDate)}]"
                  v-for="i in numOfDays" :key="i" v-html="getDayCell(r, i, startNextMonthDay, endNextMonthDate)"
                  @click="selectSecondItem(r, i)"></li>
            </ul>
          </div>
        </div>
 
  
        <div class="calendar-buttons">
          <button class="calendar-btn-apply" @click="setDateValue()">Apply</button>
          <button class="btn-sm btn-secondary calendar-btn-cancel" @click="clearDateValue()">Clear All</button>
        </div>

      </div>


    </div>
  </div>
</template>

<script src="./js/rangedate-picker.js"></script>

<style lang="css" scoped>
  /deep/ *:focus {outline:0;}
  
  .c-input-placeholder {
    color: #636e7e
  }
  
  .input-date {
    display: block;
    cursor: pointer;
    padding: 0.625rem 1rem;
    font-weight: 400;
    line-height: 1.5;
    border-radius: 0.375rem;
    border: 0.063rem solid #e0e0e0;
    background-color: #ffffff;
    width: 100%;
  }
  
  .calendar-btn-cancel {
    /*position: fixed;*/
    bottom: 19px;
    left: 20px;
    width: 90px;
    font-size: 13px;
  }
  
  .input-date::after {
    float: right;
    font-size: smaller;
    position: relative;
    right: 0;
    top: 7px;
    color: #999;
    margin-top: 4px;
    border-color: #999 transparent transparent;
    border-style: solid;
    border-width: 5px 5px 0;
    content: "";
  }
  
  .months-text {
    text-align: center;
    font-weight: 500;
    color: #636E7E;
    font-size: 14px;
  }
  
  .months-text .left {
    float: left;
    cursor: pointer;
    width: 16px;
    height: 16px;
    position: relative;
    color: #97A3B4;
    left: 5px;
    transform: scale3d(.7, 1.7, 1);
  }
  
  .months-text .right {
    float: right;
    cursor: pointer;
    width: 16px;
    height: 16px;
    color: #97A3B4;
    position: relative;
    left: -15px;
    transform: scale3d(.7, 1.7, 1);
  }

  .right-to {
    display: inline-flex;
    cursor: pointer;
    width: 16px;
    height: 16px;
    background-image: url("data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjQ5IDMxLjQ5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMS40OSAzMS40OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8cGF0aCBkPSJNMjEuMjA1LDUuMDA3Yy0wLjQyOS0wLjQ0NC0xLjE0My0wLjQ0NC0xLjU4NywwYy0wLjQyOSwwLjQyOS0wLjQyOSwxLjE0MywwLDEuNTcxbDguMDQ3LDguMDQ3SDEuMTExICBDMC40OTIsMTQuNjI2LDAsMTUuMTE4LDAsMTUuNzM3YzAsMC42MTksMC40OTIsMS4xMjcsMS4xMTEsMS4xMjdoMjYuNTU0bC04LjA0Nyw4LjAzMmMtMC40MjksMC40NDQtMC40MjksMS4xNTksMCwxLjU4NyAgYzAuNDQ0LDAuNDQ0LDEuMTU5LDAuNDQ0LDEuNTg3LDBsOS45NTItOS45NTJjMC40NDQtMC40MjksMC40NDQtMS4xNDMsMC0xLjU3MUwyMS4yMDUsNS4wMDd6IiBmaWxsPSIjMDA2REYwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=");
    filter: brightness(0);
    position: relative;
    position: relative;
    top: 4px;
    margin-left: 5px;
  }
  
  .inside-input.inside-input {
    top: 2px;
    margin-right: 4px;
  }
  
  .calendar-root,
  .calendar-title {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  
  .calendar-right-to-left {
    margin-left: -460px;
  }
  
  .calendar {
    display: flex;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    width: 770px;
    font-size: 12px;
    box-shadow: 1px 1px 8px -4px #ccc;
    background: #fff;
    position: absolute;
    z-index: 9;
    border-radius: 16px;
    border: 1px solid rgba(224, 224, 224, 0.5);
  }
  
  .calendar-head h2 {
    padding: 20px 0 0 20px;
    margin: 0;
  }
  
  .close:hover {
    cursor: pointer;
  }
  
  .close {
    float: right;
    padding: 0 10px;
    margin-top: -35px;
    font-size: 32px;
    font-weight: normal;
  }
  
  .calendar ul {
    list-style-type: none;
  }
  
  .calendar-wrap {
    display: flex;
    padding-top: 10px;
  }
  
  .calendar-range {
    padding: 20px 10px 10px 10px;
    width: 200px;
    border-right: 1px solid rgba(224, 224, 224, 0.5);
  }
  
  .calendar-left-mobile {
    width: 100% !important;
  }
  
  .calendar_month_left,
  .calendar_month_right {
    /*float: left;*/
    /*width: 43%;*/
    padding: 10px;
    /*margin: 5px;*/
  }

  .calendar_month_left {
    padding-left: 20px;
  }

  .calendar_weeks {
    margin: 0;
    padding: 10px 0;
    width: auto;
  }
  
  .calendar_weeks li {
    display: inline-block;
    width: 13.6%;
    color: #999;
    text-align: center;
  }
  
  .calendar_days {
    margin: 0;
    padding: 0;
  }
  
  .calendar_days li {
    display: inline-flex;
    width: 13.6%;
    color: #333;
    text-align: center;
    cursor: pointer;
    line-height: 2em;
    font-size: 14px;
    line-height: 38px;
    justify-content: center;
    padding: 0 12px;
  }
  
  .calendar_preset li {
    /*line-height: 2.6em;*/
    width: auto;
    display: block;
    font-size: 16px;
  }
  
  .calendar_days li:hover {
    background: #eee;
    color: #000;
  }
  
  li.calendar_days--disabled {
    pointer-events: none;
  }
  
  li.calendar_days_selected {
    /*background: #005a82;*/
    background: #FF800E;
    color: #fff;
    border-radius: 3px;
  }
  
  li.calendar_days_in-range {
    /*background: #0096d9;*/
    background: #ee7e3330;
    color: #fff;
    color: #000521;
  }
  
  .calendar_preset {
    padding: 0;
  }
  
  .calendar_preset li.calendar_preset-ranges {
    padding: 0 30px 0 10px;
    margin-bottom: 5px;
    cursor: pointer;
    margin-top: 1px;
    font-size: 14px;
    line-height: 20px;
    /*padding: 5px;*/
    color: #636E7E;
  }

  .checkbox__label:after{
    background-color: #86C339;
  }

  .checkbox__input:checked + .checkbox__label:before {
     border-color: #e0e0e0;
   }

  .checkbox__input:checked + .checkbox__label,
  .checkbox__label:hover,
  .checkbox__label:hover + .checkbox__label{
    color: #636E7E;
  }
  
  .checkbox__label:hover,
  .checkbox__label:hover:before {
    border-color: #636E7E !important;
  }

  /*.checkbox__label:hover {*/
    /*background: blue;*/
  /*}*/
  
  .calendar_preset li.calendar_preset-ranges.active-preset label {
    color: #000521;
  }
  
  .calendar_preset li.calendar_preset-ranges:hover {
    color: #636E7E;
  
  }
  
  .calendar-mobile {
    width: 260px;
    z-index: 1;
    box-shadow: none;
  }
  
  .calendar-range-mobile {
    width: 90%;
    padding: 2px;
    border-left: none;
    margin: -20px 0;
  }
  
  .calendar-btn-apply,.calendar-btn-cancel {
    color: #fff;
    width: auto;
    border: none;
    padding: 5px;
    font-size: 14px;
    background: #FF800E;
    border: 1px solid #FF800E;
    border-radius: 6px;
    padding: 12px 20px;
    font-size: 14px;
  }
  
  .calendar-buttons {
    margin: 0 0 25px 25px;
  }

  .calendar-btn-apply {
    margin-right: 10px;
  }
  
  .calendar-btn-cancel {
    background: white;
    color: #FF800E;
  }
  
  .filters-bg {
    /*background: #f77b00c2;*/
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3;
  }
</style>
