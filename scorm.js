//スライダー処理
// $(document).ready(function() {
//   $(".slider").on("init", function() {
//     $(".slide__content").addClass("on");
//   });
//   $(".slider").slick({
//     autoplay: false,
//     dots: true
//   });
//   $(".slider").on("beforeChange", function() {
//     $(".slide__content").removeClass("on");
//   });
//   $(".slider").on("afterChange", function() {
//     $(".slide__content").addClass("on");
//   });
// });

//scorm処理
var API;
function init() {
  var win1 = window;
  try {
    while (win1.API == null && win1.parent != null && win1.parent != win1) {
      win1 = win1.parent;
    }
  } catch (e) {
    console.log("e12");
  }
  if (win1.API !== undefined) {
    API = win1.API;
  }
  if (API) {
    API.LMSInitialize("");
    var name = API.LMSGetValue("cmi.core.student_name");
    var preScore = API.LMSGetValue("cmi.core.score.raw");
    API.LMSSetValue("cmi.core.session_time", "2999");
    API.LMSSetValue("cmi.core.lesson_status", "passed");
  }
  //試験開始ボタンクリックでの画面移動
  $("#previousScoreButton").click(function () {
    console.log("click")
    $("#problems").css("display", "block");
    $(function() {
      $(".slider").on("init", function() {
        $(".slide__content").addClass("on");
      });
      $(".slider").slick({
        autoplay: false,
        dots: true
      });
      $(".slider").on("beforeChange", function() {
        $(".slide__content").removeClass("on");
      });
      $(".slider").on("afterChange", function() {
        $(".slide__content").addClass("on");
      });
    });
    setTimeout(function () {
      $("#previousStatus").css("display", "none");
    },400)
  });

  //採点ボタンクリック後の処理
  $("#submit").click(function() {
    $("#problems").css("display", "none");
    $("#resultScreen").css("display", "block");
    $("#briefAnswers").html("正答はA:4、B:3、C:5、D:1、E:1、F:3");

    var qa1 = $('input[name="q1Sh"]:checked').val();
    var qa2 = $('input[name="q2Sh"]:checked').val();
    var qa3 = $('input[name="q3Sh"]:checked').val();
    var qa4 = $('input[name="q4Sh"]:checked').val();
    var qa5 = $('input[name="q5Sh"]:checked').val();
    var qa6 = $('input[name="q6Sh"]:checked').val();

    var result = 0; // デフォルトの点数=0、正解なら問題に応じて加点

    if (Number(qa1) == 3) {
      result = result + 10;
    }
    if (Number(qa2) == 2) {
      result = result + 10;
    }
    if (Number(qa3) == 4) {
      result = result + 15;
    }
    if (Number(qa4) == 0) {
      result = result + 15;
    }
    if (Number(qa5) == 0) {
      result = result + 25;
    }
    if (Number(qa6) == 2) {
      result = result + 25;
    }

    result_submit = String(result);
    $("#resultText").html("あなたの点数は" + result_submit + "点です");

    if (result < 10) {
      $("#resultTextUnder").html("真面目にやりましょう");
    }
    if (result >= 10 && result < 21) {
      $("#resultTextUnder").html("数学は運ゲーではありません");
    }
    if (result >= 21 && result < 51) {
      $("#resultTextUnder").html("数学を理解している人だと思われます");
    }
    if (result >= 51 && result < 71) {
      $("#resultTextUnder").html("とてもよくできています");
    }
    if (result >= 71 && result <= 100) {
      $("#resultTextUnder").html("素晴らしい成績です");
    }

    API.LMSSetValue("cmi.core.score.raw", result_submit);

    API.LMSCommit("");
    API.LMSFinish("");
  });
}
