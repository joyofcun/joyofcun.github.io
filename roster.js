
//Include document.ready function for the page to load after everything else.
$(document).ready(function () {

    var addedStudents = [];
    //When submit button is clicked do the following function
    document.getElementById("submitButton").onclick = function () {
        //Capture the student name from input
        var studName = document.getElementById('rosterInput').value;
        //Check if student is present in array or not
        if ((addedStudents.indexOf(studName) === -1)) {
            console.log(studName);

            //Create a list element and add classes to it for adding it to the card
            var newStudentLine = $("<li>");
            newStudentLine.text(studName);
            $('#rosterList').append(newStudentLine);
            newStudentLine.addClass("list-group-item " + studName);

            //Create a remove button to add it to the list.
            var studentRemoveButton = $("<button>");
            studentRemoveButton.text("Remove");
            studentRemoveButton.addClass("btn btn-danger removeButton");
            studentRemoveButton.attr("style", "float:right");
            studentRemoveButton.attr("studName", studName);
            newStudentLine.append(studentRemoveButton);

            //Change the value of input element to blank
            $("#rosterInput").val("");

            addedStudents.push(studName);
        }
        //If student is already present, show an alert message
        else {
            alert("This student is already present");
        }

        //When remove button is clicked, delete the row
        $(".removeButton").on('click', function () {
            var sureToDelete = confirm("Do you really want to delete the " + studName + " ?");
            if (sureToDelete) {
                $('.' + $(this).attr('studName')).remove();
                addedStudents.splice(addedStudents.indexOf(this.studName), 1);
            }
        });

    }

    //Loop through the student array to say hello.
    $("#helloButton").on('click',function(){
        for(var i=0; i<addedStudents.length; i++) {
            alert("Hello "+addedStudents[i]);
        }
    });

});