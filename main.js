let res
  function shorturl(token) {
    if(document.querySelector("#text").value==""){
		grecaptcha.reset();
        alert("网址不能为空！")
        return
    }

    document.getElementById("searchbtn").disabled=true;
	document.getElementById("searchbtn").innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>请稍候...';
    fetch(window.location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
		  url: document.querySelector("#text").value ,
		  token: token
	  })
    }).then(function(response) {
		grecaptcha.reset();
		return response.json();
  })
  .then(function(myJson) {
    res = myJson;
    document.getElementById("searchbtn").disabled=false;
	document.getElementById("searchbtn").innerHTML=' 立刻缩短！';
    if(res.key!=="")
    document.getElementById("result").innerHTML="https://"+window.location.host+res.key;
    $('#exampleModal').modal('show')
  }).catch(function(err){alert(res.key);
  document.getElementById("searchbtn").disabled=false;
  document.getElementById("searchbtn").innerHTML=' 立刻缩短！';})
  }
	// $.ajax({
	//   url: window.location.pathname,
	//   type: "post",
	//   headers: { 'Content-Type': 'application/json' },
	//   success: function(result){
	// 	  res = result.json()
	// 	  console.log(res)
	// 	  document.getElementById("searchbtn").disabled=false;
	// 	  document.getElementById("searchbtn").innerHTML=' 立刻缩短！';
	// 	  document.getElementById("result").innerHTML="https://"+window.location.host+res.key;
	// 	  $('#exampleModal').modal('show')
	//   },
	//   error: function(result){
	// 	  res = result.json()
	// 	  console.log(res)
	// 	  alert(res.key);
	// 	  document.getElementById("searchbtn").disabled=false;
	// 	  document.getElementById("searchbtn").innerHTML=' 立刻缩短！';
	//   },
	//   })
	//   grecaptcha.reset();
	// }
  function copyurl (id, attr) {
    let target = null;

    if (attr) {
        target = document.createElement('div');
        target.id = 'tempTarget';
        target.style.opacity = '0';
        if (id) {
            let curNode = document.querySelector('#' + id);
            target.innerText = curNode[attr];
        } else {
            target.innerText = attr;
        }
        document.body.appendChild(target);
    } else {
        target = document.querySelector('#' + id);
    }

    try {
        let range = document.createRange();
        range.selectNode(target);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        console.log('复制成功')
    } catch (e) {
        console.log('复制失败，请手动复制')
    }

    if (attr) {
        // remove temp target
        target.parentElement.removeChild(target);
    }
  }
  $(function () {
    $('[data-toggle="popover"]').popover()
  })