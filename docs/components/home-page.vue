<script setup lang="ts">
import source from "../public/source.js";
// import flipCard from './flip-card.vue'
// import { ref } from "vue";
// const a = ref("123213");
// import { VPTeamMembers } from 'vitepress/theme'
// import { teamMembers } from '../contributors'

// var book = $("#book");
// $("#view-cover").click(function () {
//   $(this).addClass("cur").siblings().removeClass("cur");
//   book.removeClass().addClass("view-cover");
// });
// $("#view-back").click(function () {
//   $(this).addClass("cur").siblings().removeClass("cur");
//   book.removeClass().addClass("view-back");
// });
// $("#open-book").click(function () {
//   if (book.attr("class") != "open-book") {
//     $(this).addClass("cur").siblings().removeClass("cur");
//     book.removeClass().addClass("open-book");
//   } else {
//     $(this).removeClass("cur");
//     $("#view-cover").addClass("cur");
//     book.removeClass().addClass("view-cover");
//   }
// });
// $("#view-rotate").click(function () {
//   $(this).addClass("cur").siblings().removeClass("cur");
//   book.removeClass().addClass("view-rotate");
// });
</script>

<template>
  <div class="page-content">
    <!-- <div id="opt">
      <dl>
        <dt>Console</dt>
        <dd id="view-cover" class="cur">View Cover</dd>
        <dd id="view-back">View Back</dd>
        <dd id="open-book">Open/Close book</dd>
        <dd id="view-rotate">360° Showcase</dd>
      </dl>
    </div> -->
    <div id="book" class="view-cover">
      <div class="main">
        <div class="book-font">
          <div class="book-cover">
            <h1 class="title">Wuthering Heights</h1>
            <h2 class="author">Emily Bronte</h2>
            <div class="publisher">Oxford University Press, USA</div>
          </div>
          <div class="book-cover-back"></div>
        </div>
        <div class="book-page">
          <div id="page-1" class="page">
            <h3>1 Mr Lockwood visits Wuthering Heights</h3>
            <p>
              1801 I have just returned from a visit to my landlord—the solitary
              neighbour that I shall be troubled with. This is certainly a
              beautiful country! In all England, I do not believe that I could
              have fixed on a situation so completely removed from the stir of
              society. A perfect misanthropist’s heaven; and Mr. Heathcliff and
              I are such a suitable pair to divide the desolation between us. A
              capital fellow! He little imagined how my heart warmed towards him
              when I beheld his black eyes withdraw so suspiciously under their
              brows, as I rode up, and when his fingers sheltered themselves,
              with a jealous resolution, still further in his waistcoat, as I
              announced my name.
            </p>
            <p>“Mr. Heathcliff!” I said.</p>
            <p>A nod was the answer.</p>
            <p>
              “Mr. Lockwood, your new tenant, sir. I do myself the honour of
              calling as soon as possible after my arrival, to express the hope
              that I have not inconvenienced you by my perseverance in
              soliciting the occupation of Thrushcross Grange”
            </p>
          </div>
          <div class="page-number">- 1 -</div>
        </div>
        <div class="book-back">
          <div class="description">
            <p>
              "Ideal for the college survey course: judicious introduction plus
              just the right admixture of explanatory notes (vital for American
              students' comprehension of dialect words), up-to-date
              bibliography, and several other brief, indispensable supports to
              well-informed reading."
            </p>
            <p class="txt-right">--Katherine Linehan, Oberlin College</p>
          </div>
          <div class="isbn">
            <img
              src="http://www.bluesdream.com/case/css3/3d-book-showcase/images/isbn.png"
            />
          </div>
        </div>
        <div class="book-bone">
          <h2>Emily Bronte　Wuthering Heights</h2>
        </div>
        <div class="book-top"></div>
        <div class="book-right"></div>
        <div class="book-bottom"></div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
body {
  line-height: normal;
}
.page-content {
  margin: 0 auto;
  height: calc(100vh - var(--vp-nav-height));
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#book {
  width: 420px;
  margin: 0 auto;
  position: relative;
  transition-duration: 0.5s;
  perspective: 2000px;
}
.main {
  width: 420px;
  height: 560px;
  color: #92684f;
  position: relative;
  transform-style: preserve-3d;
  transition-duration: 0.5s;
  /* transform: rotate3d(0, 1, 0, -40deg); */
}

.book-font {
  width: 420px;
  height: 560px;
  position: absolute;
  top: 0;
  bottom: 0;
  font-size: 15px;
  text-align: center;
  text-shadow: 0 2px 0 rgba(30, 35, 45, 1);
  box-shadow: inset 3px 0 10px rgba(0, 0, 0, 0.1); /* 给书本添加光照阴影 */
  z-index: 10;
  transform-style: preserve-3d;
  transform-origin: 0% 50%;
  transition-duration: 0.5s;
  transform: translate3d(0, 0, 25px);
}
.book-cover {
  width: 420px;
  height: 560px;
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  background: #29303a;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
.book-cover-back {
  width: 420px;
  height: 560px;
  position: absolute;
  top: 0;
  bottom: 0;
  background: #29303a;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transform: rotate3d(0, 1, 0, -180deg);
}
.title {
  margin: 70px 0 25px 0;
  height: 38px;
  font-size: 38px;
}
.author {
  height: 20px;
  font-size: 20px;
}
.publisher {
  width: 100%;
  position: absolute;
  bottom: 22px;
}

.book-page {
  width: 415px;
  height: 550px;
  line-height: 20px;
  position: absolute;
  top: 5px;
  z-index: 9;
  box-shadow: inset 3px 0 10px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
  transform: translate3d(0, 0, 24px);
}
.page {
  height: 500px;
  margin: 30px 40px;
  overflow: hidden;
}
.book-page h3 {
  font-size: 14px;
  text-align: center;
  margin-bottom: 14px;
}
.book-page p {
  font-size: 13px;
  margin-bottom: 14px;
}
.page-number {
  width: 100%;
  font-size: 13px;
  text-align: center;
  position: absolute;
  bottom: 10px;
}
.book-back {
  width: 420px;
  background: #29303a;
  position: absolute;
  top: 0;
  bottom: 0;
  color: white;
  transform: rotate3d(0, 1, 0, -180deg) translate3d(0, 0, 25px);
  z-index: 8;
}
.book-back .description {
  font-size: 14px;
  line-height: 20px;
  margin-top: 50px;
  padding: 10px 20px 10px 30px;
  background: rgba(255, 255, 255, 0.1);
}
.book-back p {
  padding: 5px 0;
}
.isbn {
  position: absolute;
  bottom: 20px;
  left: 30px;
}
.book-bone {
  width: 50px;
  background: #29303a;
  box-shadow: 1px 0 0 #29303a, -1px 0 0 #29303a; /* 旋转的时候 拼接处隐隐约约会有个缝隙 所以加上个阴影来填补它 */
  position: absolute;
  top: 0;
  bottom: 0;
  left: -25px;
  transform: rotate3d(0, 1, 0, -90deg);
}
.book-bone h2 {
  width: 530px;
  height: 50px;
  line-height: 50px; /* 对应关系-1 */
  font-size: 14px;
  text-align: right;
  padding: 0 15px;

  transform-origin: 0 0;

  transform: rotate(90deg) translateY(-50px);
}
.book-bone span {
  font-size: 14px;
  padding-right: 20px;
}

.book-cover:after,
.book-back:after {
  content: "";
  width: 3px;
  position: absolute;
  top: 0;
  left: 10px;
  bottom: 0;
  background: rgba(0, 0, 0, 0.06);
  box-shadow: 1px 0 3px rgba(255, 255, 255, 0.1);
}
.book-page,
.book-top,
.book-right,
.book-bottom {
  background: #eeefe9;
}
.book-right {
  width: 50px;
  height: 550px;
  position: absolute;
  top: 5px;
  right: -20px;
  box-shadow: 0 1px 0 #eeefe9, 0 -1px 0 #eeefe9;

  transform: rotate3d(0, 1, 0, 90deg);
}
.book-top {
  width: 415px;
  height: 50px;
  position: absolute;
  top: -20px;
  left: 0;
  transform: rotate3d(1, 0, 0, 90deg);
}
.book-bottom {
  width: 415px;
  height: 50px;
  position: absolute;
  bottom: -20px;
  left: 0;
  transform: rotate3d(1, 0, 0, -90deg) translate3d(0, 0, 0);
}
.book-right,
.book-top,
.book-bottom {
  backface-visibility: hidden;
}
.view-cover:hover .main {
  transform: rotate3d(0, 1, 0, -40deg);
}
.view-back .main {
  transform: rotate3d(0, 1, 0, 180deg);
}
.view-back:hover .main {
  transform: rotate3d(0, 1, 0, 140deg);
}
.open-book {
  transform: translate3d(50%, 0, 0);
}
.open-book .book-font {
  transform: translate3d(0, 0, 25px) rotate3d(0, 1, 0, -160deg);
}
.open-book:hover .main {
  transform: rotate3d(1, 1, 0, 15deg);
}
.view-rotate .main {
  transition-duration: 5s;

  transform: rotate3d(0, 1, 0, 360deg);
}
.view-rotate:hover .main {
  transition-duration: 8s;
  transform: rotate3d(0, 1, 0, -360deg);
}

#opt {
  width: 150px;
  line-height: 30px;
  text-align: center;
  padding: 10px 10px 5px 10px;
  background: rgba(255, 255, 255, 0.4);
  position: fixed;
  top: 10%;
  right: 6%;
  z-index: 100px;
}
#opt:after {
  content: "";
  width: 105%;
  height: 104%;
  position: absolute;
  top: -4%;
  left: -5%;
  border: 4px solid rgba(255, 255, 255, 0.3);
  z-index: -1;
}
#opt dt {
  margin-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
#opt dd {
  color: #999;
  cursor: pointer;
  background: rgba(170, 170, 170, 0.1);
  margin-bottom: 5px;
}
#opt dd:hover {
  color: rgba(255, 255, 255, 0.8);
  box-shadow: inset 2px 0 0 rgba(85, 85, 85, 0.2);
  background: rgba(85, 85, 85, 0.4);
}
#opt .cur {
  color: black;
  box-shadow: inset 2px 0 0 rgba(85, 85, 85, 0.2);
  background: rgba(85, 85, 85, 0.2);
}
</style>
