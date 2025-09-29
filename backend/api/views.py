from rest_framework.decorators import api_view
from rest_framework.response import Response
import re

# 三人称単数の簡易チェック関数
def check_third_person_singular(text):
    words = text.split()
    issues = []

    for i, word in enumerate(words):
        # 単純に "He/She/It + 動詞原形" のパターンをチェック
        if i > 0 and words[i-1].lower() in ["he", "she", "it"]:
            # 現在形動詞の原形を簡易判定
            # ※ここでは単純に s を付けるべきかどうかだけ判定
            if word in ["like", "go", "watch", "play"]:  # チェック対象の動詞を簡単に指定
                corrected = word + "s"
                issues.append({"bigram": f"{words[i-1]} {word}", "correction": corrected})
    return issues

@api_view(["POST"])
def check_bigrams(request):
    text = request.data.get("text", "")
    marked = check_third_person_singular(text)
    return Response({"marked": marked})
