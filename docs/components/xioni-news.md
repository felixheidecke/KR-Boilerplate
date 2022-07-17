### Beispiel

**HTML (Komplettdarstellung)**

```html
<section data-xioni="news.1234" v-cloak>
  <!-- * * * * * * * * * * -->
  <!-- * ALLES ANZEIGEN  * -->
  <!-- * * * * * * * * * * -->
  <div v-if="!details">
    <article v-for="article in items">
      <h1>{{ article.title }}</h1>
      <div class="h-margin-negative-top h-font-italic h-font-small">
        <time :datetime="dateFormat(article.date, 'L')"
          >Am {{ dateFormat(article.date) }}</time
        ><span>, von {{ article.author }}</span>
      </div>
      <div class="pure-g pure-padded-children">
        <div class="pure-u-1 pure-u-md-1-3" v-if="article.image">
          <figure>
            <img class="pure-img" :src="urlBase + article.image" />
            <figcaption v-if="article.imageDescription">
              {{ article.imageDescription }}
            </figcaption>
          </figure>
        </div>
        <div class="pure-u-1" :class="{ 'pure-u-md-2-3' : article.image }">
          <div v-html="textile(article.text)"></div>
        </div>
      </div>
      <div
        class="pure-g pure-padded-children"
        v-for="paragraph in article.paragraphs"
      >
        <figure
          class="pure-u-1"
          v-if="paragraph.image"
          :class="{ 'pure-u-md-1-4' : paragraph.text }"
        >
          <img
            :alt="paragraph.imageDescription"
            :src="urlBase + paragraph.image"
          />
          <figcaption v-if="paragraph.imageDescription">
            {{ paragraph.imageDescription }}
          </figcaption>
        </figure>
        <div
          class="pure-u-1"
          v-if="paragraph.text"
          v-html="textile(paragraph.text)"
          :class="{ 'pure-u-md-3-4' : paragraph.image }"
        ></div>
      </div>
      <p v-if="article.pdf">
        <i aria-hidden="true" class="fa fa-lg fa-push-sm fa-file-pdf-o"></i>
        <a :href="urlBase + article.pdf" target="_blank">
          <template v-if="article.pdfTitle">{{article.pdfTitle}}</template>
          <template v-else>Weitere Informationen als PDF-Datei</template>
        </a>
      </p>
      <p v-if="article.web">
        <i aria-hidden="true" class="fa fa-lg fa-push-sm fa-external-link"></i>
        <a :href="article.web" target="_blank">{{trimSheme(article.web)}}</a>
      </p>
    </article>
  </div>
</section>
```

**HTML (Übersicht und Details)**

```html
<section data-xioni="news.1234" class="kr-news" v-cloak>
  <!-- ÜBERSICHT -->
  <div v-if="!details">
    <article v-for="article in items">
      <h2 v-text="article.title"></h2>
      <p class="date">
        <time :datetime="dateFormat(article.date, 'L')"
          >Am {{ dateFormat(article.date) }}</time
        >
      </p>
      <div class="pure-g pure-padded-children">
        <div
          class="pure-u-1"
          v-html="textile(article.text)"
          :class="{ 'pure-u-md-1-2' : article.imageSmall }"
        ></div>
        <div class="pure-u-1 pure-u-md-1-2" v-if="article.imageSmall">
          <figure>
            <img class="pure-img" :src="urlBase + article.imageSmall" />
            <figcaption v-text="article.imageDescription"></figcaption>
          </figure>
        </div>
      </div>
      <p class="mehr" v-if="article.paragraphs.length > 0">
        <a
          class="kr-button kr-button-next"
          @click="goTo(article.id)"
          :title="article.title"
          >mehr</a
        >
      </p>
      <hr />
    </article>
  </div>

  <!-- DETAILS -->
  <article v-else>
    <h1 v-text="details.title"></h1>
    <div class="pure-g">
      <div
        class="pure-u-1"
        v-if="details.text"
        v-html="textile(details.text)"
      ></div>
      <div class="pure-u-1" v-if="details.image">
        <figure>
          <img class="pure-img" :src="urlBase + details.image" />
          <figcaption v-text="details.imageDescription"></figcaption>
        </figure>
      </div>
    </div>
    <div v-for="paragraph in details.paragraphs">
      <figure v-if="paragraph.image">
        <img
          :alt="paragraph.imageDescription"
          :src="urlBase + paragraph.image"
        />
        <figcaption v-text="paragraph.imageDescription"></figcaption>
      </figure>
      <div v-if="paragraph.text" v-html="textile(paragraph.text)"></div>
    </div>
    <p v-if="details.pdf">
      <i aria-hidden="true" class="fa fa-lg fa-push-sm fa-file-pdf-o"></i>
      <a :href="urlBase + details.pdf" target="_blank">
        <template v-if="details.pdfTitle">{{details.pdfTitle}}</template>
        <template v-else>Weitere Informationen als PDF-Datei</template>
      </a>
    </p>
    <p v-if="details.web">
      <i aria-hidden="true" class="fa fa-lg fa-push-sm fa-external-link"></i>
      <a :href="details.web" target="_blank">{{trimSheme(details.web)}}</a>
    </p>
    <p class="h-clear">
      <a class="kr-button kr-button-back" onClick="history.back()"
        >zurück zur Übersicht</a
      >
    </p>
  </article>
</section>
```

**JS**

```js
require('scripts/js/xioni-news.js')
```
