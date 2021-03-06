Navigation = {
    content: undefined,
    nav: undefined,
    txtDiv: undefined,
    
    init: function () {
        UserData.init();

        //identify divs
        this.content = document.getElementById("contentDiv");
        this.nav = document.getElementById("divButtons");
        this.txtDiv = document.getElementById("txtDiv");

        //check if subjectID is set = ongoing experiment
        if(UserData.subjectID !== null){
            //show instructions
            VideoInstructions.showInstructions(true);
            return;
        }

        //connect the first button
        document.getElementById("btnPartake").addEventListener("click", function () {
            //check if mobile device
            if(UserData.isMobileDevice === true){
                MessagePrompt.showMessage("It appears you are using a mobile device. It is preferred you use a computer to undertake the experiment" +
                    " as it might not work properly otherwise. Thank you.", "Close", function () {
                    Navigation.showExpInstructions();
                });
                return;
            }
            Navigation.showExpInstructions();
        },false);
    },

    showExpInstructions: function () {
        //change button
        this.nav.innerHTML = '<button id="btnStart" class="btn">Begin</button>';
        document.getElementById("btnStart").addEventListener("click", function () {Questionnaire.showQuestionnaire(); }, false);

        //change text
        this.txtDiv.innerHTML =
            '<h4>How it works</h4>\n' +
            '<p>You will be presented with 12 short code snippets and short stories extracts. ' +
            'The computer code is written in plain Java but if you are familiar with reactive programming you will also be shown a few snippets written in RxJava. ' +
            'For each code snippet you will be asked to enter all the values produced ' +
            'by the <code class="code">System.<span class="blue">out</span>.print()</code> statements. For each short story you will be asked to answer a quick question to confirmed you have read it. ' +
            'Take your time and carefully read the snippet before you enter your answer.</p>' +

            '<p><ul><li>If you need to enter multiple values you can list them after each other. You can do this with or without a space separating them. Whichever way you prefer.</li>' +
            '</ul>' +
            '</p>There will be a 6 minute maximum time limit for each text snippet shown.' +
            'This is far more than you will need as the snippets are very short. If for some reason the experiment gets disrupted there is a ' +
            'cookie set to remember how far you have gotten and you can resume when you re-open the browser.</p>' +

            '<p>The browser will ask for permission to use the web camera and run a client side algorithm on the video feed while you are reading. ' +
            'You will be asked to calibrate the algorithm by looking at a number of blue dots &nbsp;<span class="calibDot" style="position: relative; display: inline-block"></span>' +
            ' which will appear across the screen. You will also be asked to perform a shorter calibration between every few questions. This is necessary to make sure the algorithm ' +
            'is producing correct predictions. You need to keep your head in stationary position but opportunities will be given to have a break and stretch ' +
            'your neck between calibrations. </p>' +
            '<ul><li>Please turn off your mobile, close all other open programs and tabs and follow the instructions which will be given throughout.</li></ul>';

    }
};

/*========================================================================================================================
Questionnaire
 */
Questionnaire = {
    showQuestionnaire: function () {
        Navigation.nav.innerHTML ='<button type="submit" form="demogForm" id="btnSubmit" class="btn">Continue</button>';

        Navigation.txtDiv.innerHTML =
            '<h4 style="text-decoration: underline; margin: 10px;">Please enter as accurate as possible:</h4>\n' +
            '<form id="demogForm">\n' +
            '   <div class="row">\n' +
            '      <div class="column">\n' +
            '          <p>\n' +
            '              <strong>Gender: </strong><br/>\n' +
            '              <label><input name="gender" type="radio" value="female" checked> Female</label>\n' +
            '              <label><input name="gender" type="radio" value="male"> Male</label>\n' +
            '              <label><input name="gender" type="radio" value="other"> Other</label>' +
            '          </p>\n' +
            '          <p>\n' +
            '              <strong>Age: </strong>\n' +
            '              <label><input id="ageTxt" name = "age" type = "text" size = "2" autocomplete="off"></label>\n' +
            '          </p>\n' +
            '          <p>' +
            '              <strong>First language: </strong>' +
            '              <label><input id="fstLanguage" name = "fstLan" type = "text" autocomplete="off"></label>\n' +
            '          </p> ' +
            '          <p>\n' +
            '              <label><input name = "hasGlasses" type = "checkbox" value = "yes">I am wearing glasses</label>' +
            '          </p>' +
            '          <p>' +
            '              <label><input name = "hasEyeCond" type = "checkbox" value = "yes">I have an eye condition eg. glaucoma, cataracts, amblyopia</label>' +
            '          </p>' +
            '          <p>' +
            '              <label><input name = "bigLashes" type = "checkbox" value = "yes">I have eyelash extensions/thick mascara</label>' +
            '          </p>' +
            '      </div>\n' +
            '      <div class="column">\n' +
            '   <p>\n' +
            '       <h4>Previous experience:</h4><br/>\n' +
            '       <label>Java: <br/>\n' +
            '           <select name = "javaExp">\n' +
            '               <option selected>None</option>\n' +
            '               <option>Hobby level with moderate understanding</option>\n' +
            '               <option>Hobby level with good understanding</option>\n' +
            '               <option>Very capable but no official schooling or work experience</option>\n' +
            '               <option>Undergraduate education</option>\n' +
            '               <option>Postgraduate education</option>\n' +
            '               <option>Professional programmer</option>\n' +
            '           </select>\n' +
            '       </label>' +
            '   </p>' +
            '   <p>Are you familiar with the reactive programming paradigm?</p>' +
            '   <p>' +
            '       <label>Reactive programming experience: <br/>\n' +
            '           <select name = "reactExp">\n' +
            '               <option selected>None</option>\n' +
            '               <option>Hobby level with moderate understanding</option>\n' +
            '               <option>Hobby level with good understanding</option>\n' +
            '               <option>Very capable but no official schooling or work experience</option>\n' +
            '               <option>Undergraduate education</option>\n' +
            '               <option>Postgraduate education</option>\n' +
            '               <option>Professional programmer</option>\n' +
            '           </select>\n' +
            '       </label>\n' +
            '   </p>\n' +
            '<p><label>Optional notes:<br/><textarea name = "comments" rows = "4" cols = "36" placeholder="ex. web camera specifications' +
            ', educational/work background..."></textarea></label></p>' +
            '\n' +
            '      </div>\n' +
            '   </div>\n' +


            '</form>';

        //Disable button and force age validation
        document.getElementById("ageTxt").addEventListener("input", function () { Questionnaire.validateAge(); }, false);

        //validate in case of page reload
        this.validateAge();

        //connect submit button
        document.getElementById("demogForm").setAttribute("action","javascript:ServerCommunication.sendQuestionnaire()");
    },

    validateAge: function () {
        let ageText = document.getElementById("ageTxt").value;

        if(!isNaN(ageText) && ageText > 0 && ageText < 100){
            document.getElementById("btnSubmit").disabled = false;
            return;
        }
        document.getElementById("btnSubmit").disabled = true;
    }
};

VideoInstructions = {
    setUpTO: undefined,

    showInstructions: function (firstTime) {
        Navigation.content.innerHTML =
            '    <h2>Camera setup</h2>\n' +
            '    <div id="videoDest" style="height: 50%">\n' +
            '        <h3 class="red" id="giveVideoPerm">Please give the browser webcam permissions</h3>\n' +
            '    </div>\n' +
            '    <h3>Please ensure you adhere to the following points to ensure accurate measurements</h3>\n' +
            '    <p class="noMargin">Tip: Resting your head on your hand might increase precision and comfort.</p>' +
            '    <img src="img/videoInstructionsAnim.png" alt="instructions" id="vidInst" width="auto" height="25%"><br/>';

        if(firstTime){
            Navigation.nav.innerHTML = '<button id="finishVidInst" class="btn" disabled>Calibrate</button>';
        }else{
            Navigation.nav.innerHTML = '<button id="finishVidInst" class="btn" disabled>Recalibrate</button>';
        }

        document.getElementById("finishVidInst").addEventListener("click", function () {
            //hide the camera in invisible div (faster than starting and stopping it)
            let video = document.getElementById("webgazerVideoContainer");
            document.getElementById("hidden").appendChild(video);

            //pause webgazer to catch up stack???
            GazeDataCollection.pauseEyeData();

            if(firstTime){
                //send the technical data to the server and re-navigate
                UserData.getTechnicalData();
            }else{
                Calibration.calibrate();
            }
        }, false);

        //turn on video
        if(!GazeDataCollection.isRunning){
            GazeDataCollection.startCollectingCameraData();
        }else{
            VideoInstructions.relocateVideo();
        }

        GazeDataCollection.resumeEyeData();
    },

    relocateVideo: async function () {
        let video = document.getElementById("webgazerVideoContainer");
        video.style.display = "block"; video.style.position = "relative"; video.style.margin = "auto";

        let vidDest = document.getElementById("videoDest");
        vidDest.innerHTML = '';
        vidDest.appendChild(video);


        document.getElementById("finishVidInst").disabled = false;

        //Set backup timer to check for failed set up
        this.setUpTO = setTimeout(function () {
            MessagePrompt.hidePrompt();

            if(!webgazer.isReady()){
                //Can not access the video feed
                MessagePrompt.showMessage("Failed to access video. Make sure you have a working camera and have given " +
                    "the browser permission at access it. Refresh the browser to try again or click the button to discontinue the " +
                    "experiment.","Discontinue", function () {
                    document.cookie = "subjectID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    location.reload();
                });
            }else{
                //Can not find the eyes
                MessagePrompt.showMessage("Failed to locate both eyes in the video feed. Make sure the camera is working and has an " +
                    "unobstructed view of your face. Refresh the browser to try again or click the button to discontinue the " +
                    "experiment.","Discontinue", function () {
                    document.cookie = "subjectID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    location.reload();
                });
            }
        }, 60000);

        this.checkIfReady();
    },

    checkIfReady: function(){
        let faceBox = document.getElementById("webgazerFaceFeedbackBox");
        if(faceBox === null || faceBox.style.borderColor !== 'green'){
            setTimeout(function () {
                VideoInstructions.checkIfReady();
            }, 100);
        }else{
            clearTimeout(this.setUpTO);
            MessagePrompt.hidePrompt();
        }
    }
};

let MessagePrompt = {
    prompt: undefined,
    img: undefined,
    txt: undefined,
    btn: undefined,
    loader: undefined,
    isLoader: false,

    init: function () {
        this.prompt = document.getElementById("overlay");
        this.img = document.getElementById("promptImg");
        this.txt = document.getElementById("promptTxt");
        this.btn = document.getElementById("okBtn");
        this.loader = document.getElementById("loader");

        this.btn.addEventListener("click", function(){ MessagePrompt.hidePrompt() }, false);
    },

    showMessage: function (msg, btnTxt, doNext) {
        if(doNext !== null){
            this.btn.addEventListener("click",function(){doNext();}, false);
        }

        this.loader.style.display = "none";
        this.img.style.display = "none";

        this.txt.innerHTML = msg;
        this.btn.innerHTML = btnTxt;
        this.btn.style.display = "block";

        this.prompt.style.display = "block";
    },

    showImgMessage: function (msg, imgSrc, btnTxt, doNext) {
        this.img.src = imgSrc;
        this.img.style.display = "inline-block";

        if(doNext !== null){
            this.btn.addEventListener("click",function(){doNext();}, false);
        }

        this.loader.style.display = "none";

        this.txt.innerHTML = msg;
        this.btn.innerHTML = btnTxt;
        this.btn.style.display = "block";

        this.prompt.style.display = "block";
    },

    showLoader: function () {
        this.isLoader = true;
        this.prompt.style.display = "block";
        this.loader.style.display = "block";
        this.img.style.display = "none";
        this.btn.style.display = "none";
        this.txt.innerHTML = 'Setting up eye-tracking algorithm.' +
            '<br/>(make sure you have given the browser webcam access)' +
            '<br/> Please wait...';
    },

    hidePrompt: function() {
        this.isLoader = false;
        this.prompt.style.display = "none";

        //Regenerate btn to remove all listeners
        let newBtn = this.btn.cloneNode(true);
        this.btn.parentNode.replaceChild(newBtn, this.btn);
        this.btn = newBtn;
        this.btn.addEventListener("click", function(){ MessagePrompt.hidePrompt() }, false);
    }
};

CodeDisplay = {
    snippetsShown: 0,
    dims: undefined,
    tO: undefined,
    allShown: false,
    codeHelp: "Read the code and enter the output values produced by the <code class=\"code\">System.<span class=\"blue\">out</span>.print()</code> statement. " +
    "In case of multiple <code class=\"code\">System.<span class=\"blue\">out</span>.print()</code> statements enter your answers sequentially. If you prefer, you can separate " +
    "them with a space.",
    storyHelp: "Read the story extract and enter the answer to the question in the textbox." ,

    display: function (snippet) {
        //check if this is the example, then show the instructions
        if(snippet === "example"){
            //Practice prompt
            MessagePrompt.showMessage('You will now be shown a practise code snippet.<br/>'
                + 'Read the code and enter all the output values produced by the <code class="code">System.<span class="blue">out</span>.print()</code> statement. ' +
                'In case of multiple <code class="code">System.<span class="blue">out</span>.print()</code> '
                + 'statements, you can enter your answers separated by a space if you prefer.'
                , 'Start practise', function () {
                    document.getElementById("answerInput").focus();
                });
        }

        //display snippet image
        let codeImg = document.createElement("img");
        codeImg.setAttribute("src", "codeSnippets/" + snippet + ".png");
        codeImg.setAttribute("id", "snippet");
        Navigation.content.innerHTML = '';
        Navigation.content.appendChild(codeImg);

        Navigation.nav.innerHTML = '';

        let help = document.createElement("button");
        help.innerText = '?';
        help.setAttribute("id", "helpBtn");
        help.addEventListener("click", function () {
            GazeDataCollection.pauseEyeData();
            clearTimeout(CodeDisplay.tO);

            let help = CodeDisplay.codeHelp;
            if(snippet.replace(/[0-9]/g, '') === "S"){
                help = CodeDisplay.storyHelp;
            }

            MessagePrompt.showMessage(help, "Continue", function () {
                //resetTimeout
                if(snippet !== "example") {
                    CodeDisplay.tO = setTimeout(function () {
                        CodeDisplay.timeOut();
                    }, 360000);
                }
                GazeDataCollection.resumeEyeData();
            })
        },false);

        let headImg = document.createElement("img");
        headImg.setAttribute("src", "img/eyesLook.png");
        headImg.setAttribute("id", "eyesLook");
        Navigation.nav.appendChild(headImg);

        let inp = document.createElement("input");
        inp.setAttribute("id", "answerInput");
        inp.setAttribute("autocomplete", "off");
        inp.style.margin = "auto";
        inp.name = "answer";
        inp.type = "text";
        inp.style.width = "90%";

        let btn = document.createElement("button");
        btn.innerText = 'Submit';
        btn.setAttribute("id","btnSubmit");
        btn.setAttribute("class","btn");

        Navigation.nav.appendChild(inp);
        Navigation.nav.appendChild(btn);
        Navigation.nav.appendChild(help);

        inp.focus();

        if(snippet === "example"){
            //this is the example snippet
            btn.addEventListener("click", function () { CodeDisplay.exampleAnswer(); }, false);
        }else{
            //this is a true test
            btn.addEventListener("click", function () { CodeDisplay.answer(snippet); }, false);

            GazeDataCollection.restartEyeData();
            //Give maximum 6 minutes for each snippet
            this.tO = setTimeout(function () {CodeDisplay.timeOut();}, 360000);
        }
    },

    timeOut: function () {
        GazeDataCollection.pauseEyeData();
        MessagePrompt.showMessage("Snippet timed out","Resume", function(){
            //short calibration
            Calibration.calibrate()});
    },

    exampleAnswer: function () {
        let answer = document.getElementById("answerInput").value.toString().replace(/\s/g,'').toUpperCase();
        if(answer === ''){
            //do nothing, need an answer
        }else if(answer === '515' || answer === '5 15'){
            MessagePrompt.showMessage('Correct!', 'Start experiment', function(){VideoInstructions.showInstructions(true);});
        }else{
            MessagePrompt.showMessage('Wrong answer, correct was:<br/>5 15 (or 515)', 'Start experiment',
                function(){VideoInstructions.showInstructions(true);});
        }
    },

    answer: function (snippet) {
        //answer
        let inp = document.getElementById("answerInput");
        let answer = inp.value;

        //check if answer entered
        if(answer === ''){
            return;     //do nothing
        }

        //disable input
        inp.disabled = true;
        document.getElementById("btnSubmit").disabled = true;

        clearTimeout(this.tO);
        this.snippetsShown++;

        ServerCommunication.sendEyeData(snippet, answer);
    },
};

let Calibration = {
    failedCalibrations: 0,
    isCalibrated:false,
    isCalibrating: false,
    sampleCount: 10,
    samplesLeft: undefined,
    calibrationPositions: undefined,
    areaHeight: undefined, areaWidth: undefined, areaX: undefined, areaY: undefined,

    dot: undefined,
    curPos: undefined,
    intTmeOt: undefined,

    calibrate: function(){
        //do not use filter when calibrating
        webgazer.applyKalmanFilter(false);

        CodeDisplay.snippetsShown = 0;
        this.curPoint = 0;
        this.isCalibrating = true;

        //get div dimensions
        let dotSize = 20;
        this.areaHeight = Navigation.content.offsetHeight - dotSize * 3;
        this.areaWidth = Navigation.content.offsetWidth - dotSize * 3;
        let rect = Navigation.content.getBoundingClientRect();
        this.areaX = rect.left;
        this.areaY = rect.top;

        this.calibrationPositions = [];
        for(let r = dotSize; r <= dotSize + this.areaHeight; r = r + this.areaHeight / 3){
            for(let c = dotSize; c <= dotSize  + this.areaWidth; c = c + this.areaWidth / 3){
                this.calibrationPositions.push([c,r]);
            }
        }

        if(!this.isCalibrated){
            //clear previous data to start calibration from scratch
            webgazer.clearData();
            window.localStorage.clear();

            //Do full calibration
            for(let r = dotSize + this.areaHeight / 6; r <= dotSize + this.areaHeight; r = r + this.areaHeight / 3){
                for(let c = dotSize + this.areaWidth / 6; c <= dotSize + this.areaWidth; c = c + this.areaWidth / 3){
                    this.calibrationPositions.push([c,r]);
                }
            }
        }

        //validation points (H formation covering center screen)
        let valPoints = [[this.areaWidth / 6 + dotSize, dotSize],
            [this.areaWidth / 6 * 5 + dotSize, dotSize],
            [this.areaWidth / 6 + dotSize, this.areaHeight / 6 * 3 + dotSize],
            [this.areaWidth / 6 * 5 + dotSize, this.areaHeight / 6 * 3 + dotSize],
            [this.areaWidth / 6 + dotSize, this.areaHeight + dotSize],
            [this.areaWidth / 6 * 5 + dotSize, this.areaHeight + dotSize],
            [this.areaWidth / 2 + dotSize, this.areaHeight / 2 + dotSize]];

        //shuffle points
        Util.shuffle(this.calibrationPositions);
        Util.shuffle(valPoints);

        //add validation points last
        Array.prototype.push.apply(this.calibrationPositions, valPoints);

       //Save total number of point for the calibration
        this.numPoints = this.calibrationPositions.length;

        //clear content div and nav div
        Navigation.content.innerHTML = '';
        Navigation.nav.innerHTML = '';

        //start calibrating
        MessagePrompt.showImgMessage('Please look at the blue dot <div class="calibDot" style="position: relative; display: inline-block"></div> ' +
            'until it turns green.',
            'img/eyesLook.png','Start calibration',function () {
            this.intTmeOt = setTimeout(function () {
                GazeDataCollection.newCalibration();
                Calibration.displayCalibrationPoint();
            }, 2000);
        });
    },

    timeout: function(){
        GazeDataCollection.pauseEyeData();
        MessagePrompt.showMessage("Calibration timed out","Restart calibration", function () {
            Calibration.calibrate();
        });
    },

    displayCalibrationPoint: function(){
        if(this.calibrationPositions.length === 7){
            //Validation has started
            this.isCalibrating = false;
        }

        this.samplesLeft = this.sampleCount;

        this.curPos = this.calibrationPositions.shift();

        this.dot = document.createElement("btn");
        this.dot.innerText = this.samplesLeft;
        this.dot.setAttribute("class", "calibDot unselectable");
        this.dot.style.left = Util.roundToTwo(this.curPos[0]) + 'px';
        this.dot.style.top = Util.roundToTwo(this.curPos[1]) + 'px';

        Navigation.content.appendChild(this.dot);
        this.intTmeOt = setTimeout(function () {
            //reset gaze data for each point
            GazeDataCollection.restartEyeData();
            Calibration.autoCalibrate();
        }, 1000);
    },

    autoCalibrate: function(){
        this.intTmeOt = setTimeout(function(){Calibration.calibrationHit();}, 100);
    },

    calibrationHit: function(){
        //Do until all samples taken
        if(this.samplesLeft > 0){
            this.samplesLeft--;

            if(this.isCalibrating){
                //Manually feeds training data to regression model
                webgazer.watchListener(this.curPos[0] + 10, this.curPos[1] + 10);
            }

            let blue = 255 / this.sampleCount * this.samplesLeft;
            let green =  255 / this.sampleCount * (this.sampleCount - this.samplesLeft);
            let red = this.sampleCount - this.samplesLeft;
            this.dot.style.background = 'rgb(' + red + ',' + green + ',' + blue + ')';
            this.dot.innerText = this.samplesLeft + 1;

            Calibration.autoCalibrate();
            return;
        }
        //pause webgazer to allow the stack to catch up???
        GazeDataCollection.pauseEyeData();

        //increment counter
        this.curPoint++;

        //save validation data
        if(!this.isCalibrating){
            GazeDataCollection.validationRead();
        }

        //clear div
        Navigation.content.innerHTML = '';

        //display new point
        if(this.numPoints > this.curPoint){
            setTimeout(function () {
                Calibration.displayCalibrationPoint();
            }, 500);
        }else{
            clearTimeout(this.intTmeOt);

            //send the data
            ServerCommunication.sendCalibrationData();
        }
    }
};

EndOfExperiment = {
    hasEnded: function (correct, total) {
        //show gaze point
        webgazer.showPredictionPoints(true).applyKalmanFilter(true);
        GazeDataCollection.resumeEyeData();

        //end of test, clear cookie
        document.cookie = "subjectID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        //clear navigation div
        Navigation.nav.innerHTML = '';

        Navigation.content.innerHTML =
            '<header>\n' +
            '        <table>\n' +
            '            <thead>\n' +
            '            <tr>\n' +
            '                <th class="hImg">\n' +
            '                    <img src="img/uniLogo.png" alt="Mid Sweden University" id="leftImg">\n' +
            '                </th>\n' +
            '                <th class="hTxt">\n' +
            '                    <h2>Eye tracking study</h2>\n' +
            '                    <h3>Visual processing of computer code using webcam gaze prediction</h3>\n' +
            '                </th>\n' +
            '                <th class="hImg">\n' +
            '                    <img src="img/programmer.bmp" alt="programmer" id="rightImg">\n' +
            '                </th>\n' +
            '            </tr>\n' +
            '            </thead>\n' +
            '        </table>\n' +
            '    </header>' +
            '<div id="txtDiv">\n' +
            '   <div class="row">\n' +
            '      <div class="column" id="photoDiv">' +
            '        <h4 style="margin:auto"">Photo</h4>' +
            '        <div id="videoDest" style="position:relative"></div>' +
            '        <p id="photoInst">It would be beneficiary for the study to know how you are seated and your webcam quality. Would you allow a ' +
            'photo to be saved from the webcam? This is of course optional and will not be published anywhere!</p>' +
            '        <button id="photoYes">Yes</button>' +
            '        <button id="photoNo">No</button>' +
            '    </div>' +
            '   <div id="comment" class="column">' +
            '    <h4>Thank you very much for your participation.</h4>\n' +
            '    <h5>You got ' + correct + ' of ' + total + ' snippets correct.</h5>' +
            '      <p>Thank you for taking the time to do this experiment. The data generated will be invaluable as I write my thesis.</p>' +
            '       <p><label>Optional notes:<br/>' +
            '           <textarea id = "comments" rows = "4" cols = "36" placeholder="Any thoughts/feedback about the experiment?"></textarea>' +
            '       </label></p>' +
            '       <button id="subFeedBack">Send</button>' +
            '       <p>//Eva </br>evth1400@student.miun.se</p>' +
            '   </div>' +
            '</div>';

            //connect listeners
            document.getElementById("photoNo").addEventListener("click",function () {
                document.getElementById("photoYes").style.display = "none";
                document.getElementById("photoNo").style.display = "none";
                document.getElementById("photoInst").innerHTML = document.getElementById("photoInst").innerHTML + "</br><strong>No photo</strong>";
            },false);
            document.getElementById("photoYes").addEventListener("click",function () {
                EndOfExperiment.takePhoto();
                document.getElementById("photoYes").style.display = "none";
                document.getElementById("photoNo").style.display = "none";
                document.getElementById("photoInst").innerHTML = document.getElementById("photoInst").innerHTML + "</br><strong>Photo sent!</strong>";
            },false);
            document.getElementById("subFeedBack").addEventListener("click",function () {
                document.getElementById("subFeedBack").disabled = true;
                document.getElementById("comments").disabled = true;
                UserData.feedback = document.getElementById("comments").value;
                ServerCommunication.sendFeedBack();
            },false);

            //get video
            let video = document.getElementById("webgazerVideoFeed");
            video.style.display = "block"; video.style.position = "relative";
            video.style.height = "200px"; video.style.width = "auto";

            //reposition video
            let vidDest = document.getElementById("videoDest");
            vidDest.innerHTML = '';
            vidDest.appendChild(video);

            //add comment to nav
            let willStop = document.createElement("p");
            willStop.innerText = "Access to your webcam will stop once this tab is closed.";
            Navigation.nav.appendChild(willStop);
    },

    takePhoto: function () {
        let canvas = document.getElementById('webgazerVideoCanvas');
        let data_out = canvas.toDataURL('image/jpeg');

        ServerCommunication.sendPhoto(data_out);
    }
};

window.addEventListener("load", function () {
    MessagePrompt.init();
    Navigation.init();
    },false);
