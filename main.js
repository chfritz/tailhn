#!/usr/bin/env node

'use strict';

/*
Tail the Hacker News API. Use with grep to monitor for interesting stories.

https://github.com/HackerNews/API
*/

import fetch from 'node-fetch';

const baseURL = 'https://hacker-news.firebaseio.com/v0';
const hnItemURL = 'https://news.ycombinator.com/item?id=';

const seen = new Set();

const fetchJson = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

const fetchNew = async () => {
  const data = await fetchJson(
    `${baseURL}/newstories.json?&orderBy="$key"&limitToFirst=30`);
  // we assume there are no more than 30 new stories per minute

  if (!data) {
    console.warn('failed to fetch latest');
    return;
  }

  const newItems = data.filter(id => !seen.has(id));
  newItems.forEach(async itemId => {
    const res = await fetchJson(`${baseURL}/item/${itemId}.json`);
    if (!res) {
      console.warn(`** Failure to retrieve ${itemId}`);
    } else {
      console.log(`${res.title}. ${res.url || ''} ${hnItemURL}${itemId}`);
    }
    seen.add(itemId);
  });
}

fetchNew();
setInterval(fetchNew, 60 * 1000);