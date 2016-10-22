// Polyfills
import 'core-js/shim';

import 'source-map-support/register';

import init from './init';
import { parsePostCallback, parseRawCallback } from './parseFilters';
import { postSaveCallback, postEditCallback } from './postSave';
import { privilegesList, privilegesGroupsList, privilegesListHuman } from './privileges';
import { deleteEvent } from './event';
import './sockets';

const Translator = require.main.require('./public/src/modules/translator').Translator;
import moment from 'moment';
import { init as initTranslatorModule } from './translatorModule';
initTranslatorModule(Translator, moment);

const addNavigation = (navs, callback) => {
  navs.push({
    route: '/calendar',
    title: '\\[\\[calendar:calendar\\]\\]',
    iconClass: 'fa-calendar',
    textClass: 'visible-xs-inline',
    text: '\\[\\[calendar:calendar\\]\\]',
  });
  callback(null, navs);
};
const adminMenu = (header, callback) => {
  header.plugins.push({
    route: '/plugins/calendar',
    icon: 'fa-calendar',
    name: 'Calendar',
  });
  callback(null, header);
};

const composerFormatting = (data, callback) => {
  data.options.push({
    name: 'plugin-calendar-event',
    className: 'fa fa-calendar-o plugin-calendar-composer-edit-event',
    title: '[[calendar:edit_event]]',
  });
  callback(null, data);
};

const postDelete = (pid, cb) => deleteEvent(pid).asCallback(cb);

export {
  init,
  addNavigation,
  adminMenu,
  parsePostCallback as parsePost,
  parseRawCallback as parseRaw,
  postSaveCallback as postSave,
  privilegesList,
  privilegesGroupsList,
  privilegesListHuman,
  postEditCallback as postEdit,
  composerFormatting,
  postDelete,
};
