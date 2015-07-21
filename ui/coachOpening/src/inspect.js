var m = require('mithril');

var board = require('./board');
var moves = require('./moves');
var progress = require('./shared').progress;
var resultBar = require('./shared').resultBar;

function bestWin(w) {
  if (!w.user) return;
  return m('a', {
    href: '/' + w.id
  }, [
    w.user.title ? (w.user.title + ' ') : '',
    w.user.name,
    ' (',
    m('strong', w.rating),
    ')'
  ]);
}

module.exports = function(ctrl, inspecting) {
  var d = ctrl.data;
  var family = inspecting.family;
  var o = d.openings.map[family];
  return m('div.top.inspect', [
    m('a.back', {
      'data-icon': 'L',
      onclick: function() {
        ctrl.vm.inspecting = null;
      }
    }),
    resultBar(o),
    m('h2', [
      m('strong', family),
      m('em', d.moves[family]),
      progress(o.ratingDiff)
    ]),
    m('div.content', [
      board(ctrl, family),
      m('div.right', [
        moves(ctrl, family),
        m('table', [
          m('tr', [
            m('th', 'Played in'),
            m('tr', [
              m('strong', o.nbGames),
              ' games (',
              m('strong', Math.round(o.nbGames * 100 / ctrl.data.colorResults.nbGames)),
              '%)'
            ])
          ]),
          m('tr', [
            m('th', 'Average opponent'),
            m('tr', m('strong', o.opponentRatingAvg))
          ]),
          o.bestWin ? m('tr', [
            m('th', 'Best win'),
            m('tr', bestWin(o.bestWin))
          ]) : null,
          m('tr', [
            m('th', 'Last played'),
            m('tr', m('time.moment-from-now', {
              datetime: o.lastPlayed
            }))
          ])
        ])
      ])
    ])
  ]);
};