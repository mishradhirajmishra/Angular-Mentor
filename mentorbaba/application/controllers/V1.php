<?php
require(APPPATH . '/libraries/REST_Controller.php');
require(APPPATH . '/libraries/ImplementJwt.php');

class V1 extends REST_Controller
{

    public function __construct()
    {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method ,Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if($method == "OPTIONS") {
            die();
        }
        parent::__construct();
        $this->objOfJwt = new ImplementJwt();
        $this->load->model('sch_model');
        $this->load->helper('url');
        $this->load->library('email');

    }
    /*##########################################################*/
    /* OTHER  */
    /*##########################################################*/

    function contactUs_post()
    {
        $data = $this->post('data');
        $mantee = $this->sch_model->add_contact($data);
        if ($mantee) {
            $this->response('Thank you! We will get back to you ASAP :-)<', 200);
        }
        else{
            $this->response('Oops! Something went wrong while submitting the form.', 200);
        }
    }

    function allContact_get()
    {
        $con = $this->sch_model->all_contact();
        if ($con) {
            $this->response($con, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /*http://localhost/mentorbaba/v1/login */
    function validateEmail_post()
    {
        $email = $this->post('email');
        $mantee = $this->sch_model->chk_mantee_email_exist($email);
        if ($mantee) {
            $this->response('Ok , click on send  and check your Email . ', 200);
        }
        else{
            $this->response('Please Enter Your Registered Email . ', 200);
        }
    }
    /*http://localhost/mentorbaba/v1/login */
    /*http://localhost/mentorbaba/v1/sendEmailToUser */
    function sendEmailToUser_get()
    {
        $this->load->library('email');
        $email = 'abc@gmail.com';
        $user_name = $this->sch_model->validate_user_email($email);
        if ($user_name) {
            $pass=rand(5,6);
           $x= $this->sch_model->reset_mantee_password($pass,$email);
            $this->response($x, 200);
        }
        else{
            $this->response('Please Enter Your Registered Email . ', 200);
        }
    }
    /*##########################################################*/
    /* Login */
    /*##########################################################*/
    /*=========================================================================================*/

    /*http://localhost/mentorbaba/v1/login */
    function login_post()
    {
        $data['username']=$this->post('username');
        $password=$this->post('password');
        $remb=$this->post('remb');
        $password=md5($password);
        $temp['msg']="";
        $temp['type']="";
        $temp['data']="";
        $temp['redirect']=false;
        if ($data['username'] && $password){
            $result = $this->sch_model->login($data);
            if ($result){
                if( $result['password']==$password){
                    $this->sch_model->change_login_status_true($result['id']);
                    $temp['type']=$result['role'];
                    $temp['redirect']=true;
                    $temp['msg']="login Successfully";
                    $profile=json_decode($result['profile'],true);
                    $temp['profile']=$profile['name'];
                    $temp['remember']=$remb;
                    $result['remember']=$remb;
                    $result['usertype']=$result['role'];
                    $result['randam_key']=md5(rand());
                    unset($result['profile']);
                    $result['image'] = base_url() . 'uploads/' . $result['profile_img'];
                    unset($result['profile_img']);
                    unset($result['intrest_area']);
                    unset($result['profile_img']);
                    unset($result['profile']);
                    unset($result['password']);
                    unset($result['invitecode']);
                    unset($result['updated_at']);
                    unset($result['jwt']);
                    $jwtToken = $this->objOfJwt->GenerateToken($result);
                    $data1=array('id'=>$result['id'],'jwt'=>$jwtToken);
                    $this->sch_model->update_jwt($data1);
                    $temp['data']=$jwtToken ;

                }else{
                    $temp['msg']='Wrong Password';
                }
            }else{
                $temp['msg']='Wrong Username';
            }
            $this->response($temp, 200);
        }else{
            $this->response('', 200);
        }
    }
    /*=========================================================================================*/
    /* http://localhost/mentorbaba/v1/chatContactList   */
    function logout_post()
    {
        $unique_key= $this->post('user_key');
        $res = $this->sch_model->logout($unique_key);
        if ($res) {
            $this->response($unique_key, 200);
        }
        else{
            $this->response($unique_key, 200);
        }
    }
    /*=========================================================================================*/
    /* http://localhost/mentorbaba/v1/chatContactList   */
    function loginStatusIndividual_post()
    {
        $unique_key= $this->post('user_key');
        $res = $this->sch_model->login_status_individual($unique_key);
        if ($res) {
            $this->response($res, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /*=========================================================================================*/

    /* http://localhost/mentorbaba/v1/getRole   */
    function getRole_post()
    {
        /*............................................*/
        $user_key = $this->post('user_key');
        $role = $this->sch_model->mantee_role_by_key($user_key);
        if ($role) {
            $this->response($role, 200);
        }
        else{
            $this->response('', 200);
        }

        /*...............................................*/
    }
    /*##########################################################*/
    /* MANTOR && MANTEE */
    /*##########################################################*/
    /*=========================================================================================*/

    /* http://localhost/mentorbaba/v1/addMantee   */
    function addMantee_post()
    {
        $username=$data['username'] = $this->post('username');
        $email= $data['email'] = $this->post('email');
        $data['skype_id'] = $this->post('skype_id');
        $password=   $data['password'] = $this->post('password');
        $data['invitecode'] = $this->post('invitecode');
        $data['role'] ="mentee";
        $mantee = $this->sch_model->add_mantee($data);
        if ($mantee) {
            // --------------------------------------------------------------------------------------------
            $config['charset'] = 'utf-8';
            $config['mailtype'] = 'html';
            $this->email->initialize($config);
            $this->email->from('info@mentorbaba.co', 'mentorBaba');
            $this->email->to($email);
            $this->email->subject('Password confirmation');
            $message='<html>
			<head>
			<title>Page Title</title>
			</head>
			<body>
			<div style="border:10px solid #1f3291">
			<img style="width:200px;margin:20px" src="https://mentorbaba.co/img/logo.png" >
            <p style="font-size: 20px;margin-left:20px;">Dear '.$user_name.',</p>
			<p style="font-size: 20px;margin-left:20px;" >Thank you for registering your account on mentorBaba. We can’t wait to get you onboard. Your credentials  Detail is</p>
            <br>
            <p> <span style="color:red;margin-left:20px;">Username : </span> '.$username.'</p>
             <p> <span style="color:red;margin-left:20px;">Password : </span> '.$password.'</p>
     	    <p style="text-align: right;font-size: 20px;margin-right:20px;" >Thank You</p>
            <p style="text-align: right;font-size: 20px;margin-right:20px;" >Regards</p>
			<p style="text-align: right;font-size: 25px;margin-right:20px;color:#1f3291" >mentorBaba team</p>
			</div>
			</body>
			</html>';
            $this->email->message($message);
            $this->email->send();

            // --------------------------------------------------------------------------------------------
            $this->response('Registred Successfully !', 200);
        }
        else{
            $this->response('Unable to Register', 200);
        }
    }
    /*=========================================================================================*/
    /* http://localhost/mentorbaba/v1/addMantor   */
    function addMantor_post()
    {
        $username=$data['username'] = $this->post('username');
        $email= $data['email'] = $this->post('email');
        $data['skype_id'] = $this->post('skype_id');
        $password=$data['password'] = $this->post('password');
        $data['startuparea'] = $this->post('startuparea');
        $data['invitecode'] = $this->post('invitecode');
        $data['role'] ="mentor";
        $mantor = $this->sch_model->add_mantee($data);
        if ($mantor) {
            // --------------------------------------------------------------------------------------------
            $config['charset'] = 'utf-8';
            $config['mailtype'] = 'html';
            $this->email->initialize($config);
            $this->email->from('info@mentorbaba.co', 'mentorBaba');
            $this->email->to($email);
            $this->email->subject('Password confirmation');
            $message='<html>
			<head>
			<title>Page Title</title>
			</head>
			<body>
			<div style="border:10px solid #1f3291">
			<img style="width:200px;margin:20px" src="https://mentorbaba.co/img/logo.png" >
            <p style="font-size: 20px;margin-left:20px;">Dear  '.$username.',</p>
			<p style="font-size: 20px;margin-left:20px;" >Thank you for registering your account on mentorBaba. We can’t wait to get you onboard. Your credentials  Detail is</p>
            <br>
            <p> <span style="color:red;margin-left:20px;">Username : </span> '.$username.'</p>
             <p> <span style="color:red;margin-left:20px;">Password : </span> '.$password.'</p>
     	    <p style="text-align: right;font-size: 20px;margin-right:20px;" >Thank You</p>
            <p style="text-align: right;font-size: 20px;margin-right:20px;" >Regards</p>
			<p style="text-align: right;font-size: 25px;margin-right:20px;color:#1f3291" >mentorBaba team</p>
			</div>
			</body>
			</html>';
            $this->email->message($message);
            $this->email->send();

            // --------------------------------------------------------------------------------------------
            $this->response('Registred Successfully !', 200);
        }
        else{
            $this->response('Unable to Register', 200);
        }
    }

    /*=========================================================================================*/
    function  testmentee_get(){
        $all_mantee = $this->sch_model->mantee_by_id(1);
        $help_area=json_decode($all_mantee['help_area'],true);

//     print_r($help_area);
        $allhelp='';
        for ( $i=1; $i<=count($help_area); $i++ ){
            if($help_area[$i]==1){
                $allhelp.=$this->sch_model->help_sub_area_name_by_id($help_area[$i]);
            }
//
        }
        print_r($allhelp);
    }
    /*http://localhost/mentorbaba/v1/allManteeCrousel           */
    function allMentor_post()
    {
        $key= $this->post('user_key');
        $all_mantee = $this->sch_model->all_mentor($key);
        $response=array();

        if ($all_mantee) {
            $temp2 = array();
            $count=1;
            $count2=1;
            foreach ($all_mantee as$row){
                $temp = array();
                $temp['unique_key'] = $row['unique_key'];
                $temp['username'] = $row['username'];
                $temp['role'] = $row['role'];
                $help_area=json_decode($row['help_area'],true);
                $temp['help_area']='';
                if($help_area) {
                    for ($i = 1; $i <= count($help_area); $i++) {
                        if ($help_area[$i] == 1)
                            $temp['help_area'] .= $this->sch_model->help_sub_area_name_by_id($i);
                    }
                }

                $data3=array('admin_key'=>$row['unique_key'],'user_key'=>$key);
                $follow=$this->sch_model->is_follow($data3);
                if($follow ==1){   $temp['follow'] = true; }else{   $temp['follow'] = false;}
                $temp['profile_img'] = base_url() . 'uploads/' . $row['profile_img'];
                $temp2['profile'] = json_decode($row['profile'],true);
                $temp['name'] = $temp2['profile']['name'];
                $temp['bio'] = substr($temp2['profile']['bio'],0, 70);
                if($count2==1){$temp['class'] ='active';$count2++;}else{$temp['class'] ='';}
                $temp['desk_count'] =$count++;
                if($count==5){$count=1;}
                array_push($response, $temp);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }

    /*http://localhost/mentorbaba/v1/allManteeCrousel           */
    function allUser_post()
    {
        $key= $this->post('user_key');
        $all_mantee = $this->sch_model->all_mantee_except_me($key);
        $response=array();

        if ($all_mantee) {
            $temp2 = array();
            $count=1;
            $count2=1;
            foreach ($all_mantee as$row){
                $temp = array();
                $temp['unique_key'] = $row['unique_key'];
                $temp['username'] = $row['username'];
                $temp['role'] = $row['role'];
                $data3=array('admin_key'=>$row['unique_key'],'user_key'=>$key);
                $follow=$this->sch_model->is_follow($data3);
                if($follow ==1){   $temp['follow'] = true; }else{   $temp['follow'] = false;}
                $temp['profile_img'] = base_url() . 'uploads/' . $row['profile_img'];
                $temp2['profile'] = json_decode($row['profile'],true);
                $temp['name'] = $temp2['profile']['name'];
                $temp['bio'] = substr($temp2['profile']['bio'],0, 70);
                if($count2==1){$temp['class'] ='active';$count2++;}else{$temp['class'] ='';}
                $temp['desk_count'] =$count++;
                if($count==5){$count=1;}
                array_push($response, $temp);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /*http://localhost/mentorbaba/v1/follower          */

    function follower_post()
    {
        $key= $this->post('user_key');
        $all_mantee = $this->sch_model->my_follower($key);
        $response=array();

        if ($all_mantee) {
            $temp2 = array();
            $count=1;
            $count2=1;
            foreach ($all_mantee as$row){
                $temp = array();
                $temp['unique_key'] = $row['unique_key'];
                $temp['username'] = $row['username'];
                $temp['role'] = $row['role'];
                $data3=array('admin_key'=>$row['unique_key'],'user_key'=>$key);
                $follow=$this->sch_model->is_follow($data3);
                if($follow ==1){   $temp['follow'] = true; }else{   $temp['follow'] = false;}
                $temp['profile_img'] = base_url() . 'uploads/' . $row['profile_img'];
                $temp2['profile'] = json_decode($row['profile'],true);
                $temp['name'] = $temp2['profile']['name'];
                $temp['bio'] = substr($temp2['profile']['bio'],0, 70);
                if($count2==1){$temp['class'] ='active';$count2++;}else{$temp['class'] ='';}
                $temp['desk_count'] =$count++;
                if($count==5){$count=1;}
                array_push($response, $temp);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /*http://localhost/mentorbaba/v1/searchUser          */

    function searchUser_post()
    {
        $key= $this->post('search');
        $all_mantee = $this->sch_model->search_user($key);
        $response=array();

        if ($all_mantee) {
            $temp2 = array();
            $count=1;
            $count2=1;
            foreach ($all_mantee as$row){
                $temp = array();
                $temp['unique_key'] = $row['unique_key'];
                $temp['username'] = $row['username'];
                $data3=array('admin_key'=>$row['unique_key'],'user_key'=>$key);
                $follow=$this->sch_model->is_follow($data3);
                if($follow ==1){   $temp['follow'] = true; }else{   $temp['follow'] = false;}
                $temp['profile_img'] = base_url() . 'uploads/' . $row['profile_img'];
                $temp2['profile'] = json_decode($row['profile'],true);
                $temp['name'] = $temp2['profile']['name'];
                $temp['bio'] = substr($temp2['profile']['bio'],0, 70);
                if($count2==1){$temp['class'] ='active';$count2++;}else{$temp['class'] ='';}
                $temp['desk_count'] =$count++;
                if($count==5){$count=1;}
                array_push($response, $temp);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /*=========================================================================================*/

    /*http://localhost/mentorbaba/v1/allManteeCrousel           */
    function allManteeCrousel_post()
    {
        $key= $this->post('user_key');
        $all_mantee = $this->sch_model->all_mantee_except_me($key);
        $response=array();

        if ($all_mantee) {
            $temp2 = array();
            $count=1;
            $count2=1;
            foreach ($all_mantee as$row){
                $temp = array();
                $temp['unique_key'] = $row['unique_key'];
                $temp['username'] = $row['username'];
                $data3=array('admin_key'=>$row['unique_key'],'user_key'=>$key);
                $follow=$this->sch_model->is_follow($data3);
                if($follow ==1){   $temp['follow'] = true; }else{   $temp['follow'] = false;}
                $temp['profile_img'] = base_url() . 'uploads/' . $row['profile_img'];
                $temp2['profile'] = json_decode($row['profile'],true);
                $temp['name'] = $temp2['profile']['name'];
                $temp['bio'] = substr($temp2['profile']['bio'],0, 70);
                if($count2==1){$temp['class'] ='active';$count2++;}else{$temp['class'] ='';}
                $temp['desk_count'] =$count++;
                if($count==5){$count=1;}
                array_push($response, $temp);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }

    /*http://localhost/mentorbaba/v1/allManteeCrouselDesk           */
    function allManteeCrouselDesk_post()
    {
        $key= $this->post('user_key');
        $all_mantee = $this->sch_model->all_mantee_except_me($key);
        $response=array();
        if ($all_mantee) {
            $temp2 = array();
            $res = array();
            $count=1;
            $count2=1;
            $remend= array();
            foreach ($all_mantee as$row){
                $temp = array();
                $temp['id'] = $row['id'];
                $temp['username'] = $row['username'];
                $temp['user_key'] = $row['unique_key'];
                $data3=array('admin_key'=>$row['unique_key'],'user_key'=>$key);
                $follow=$this->sch_model->is_follow($data3);
                if($follow ==1){   $temp['follow'] = true; }else{   $temp['follow'] = false;}
                $temp['login_status'] = $row['login_status'];
                $temp['profile_img'] = base_url() . 'uploads/' . $row['profile_img'];
                $temp2['profile'] = json_decode($row['profile'],true);
                $temp['name'] = $temp2['profile']['name'];
                $temp['bio'] = substr($temp2['profile']['bio'],0, 70);
                if($count2==1){$temp['class'] ='active';$count2++;}else{$temp['class'] ='';}
                $temp['count'] =$count++;
                array_push($response, $temp);
                if(($count%4)==1){
                    /* array_push($res, $response);*/
                    $res[]=$response;
                    unset($response);
                    $response= array();
                }else{
                    $remend=$response;
                }
            }
            $res[]=$remend;
            $this->response($res, 200);
        }
        else{
            $this->response('', 200);
        }

    }
    /*=========================================================================================*/

    /*http://localhost/mentorbaba/v1/manteeById   */
    function manteeById_get()
    {
        $id = $this->get('id');
        $mantee = $this->sch_model->mantee_by_id($id);
        if ($mantee) {
            $this->response($mantee, 200);
        }
        else{
            $this->response('no', 200);
        }

    }
    /*=========================================================================================*/

    /*http://localhost/mentorbaba/v1/manteeByKey   */
    function accountByKey_post()
    {

        $unique_Key= $this->post('unique_key');
        $mantee = $this->sch_model->account_by_unique_Key($unique_Key);
        if ($mantee) {
            $this->response($mantee, 200);
        }
        else{
            $this->response('no', 200);
        }

        /*...............................................*/
    }
    /*=========================================================================================*/

    /* http://localhost/mentorbaba/v1/manteeById */

    function userExist_post()
    {
        $username = $this->post('username');
        $mantee = $this->sch_model->chk_mantee_exist($username);
        if ($mantee) {
            $this->response('User already exist !', 200);
        }
        else{
            $this->response('', 200);
        }
    }

    /* http://localhost/mentorbaba/v1/manteeById */

    function codeValidation_post()
    {
        $data['my_code']= $this->post('my_code');
        $mantee = $this->sch_model->chk_code_exist($data);
        if ($mantee) {
            $this->response('Valid code', 200);
        }
        else{
            $this->response('Invalid Code', 200);
        }
    }
    /*=========================================================================================*/
    /*http://localhost/mentorbaba/v1/manteeEmailExist        */
    function emailExist_post()
    {
        $email = $this->post('email');
        $mantee = $this->sch_model->chk_mantee_email_exist($email);
        if ($mantee) {
            $this->response('Email already exist !', 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /*=========================================================================================*/

    /* http://localhost/mentorbaba/v1/updateManteeProfile */
    function updateManteeProfile_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        $user_key= $this->post('user_key');
        if($res && $user_key == $unique_key){
            $data = $this->post('data');
            $mantee = $this->sch_model->update_mantee_profile($data, $user_key);
            if ($mantee) {
                $this->response('Updated successfully !', 200);
            } else {
                $this->response('You are no autharized', 200);
            }
        }
        else{
            $this->response('Unautharised Access!', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/updateMeeting */
    function updateMeeting_post()
    {

        $data = $this->post('data');
        $user_key= $this->post('user_key');
        $data['user_key']=$user_key;
        if($data){
            $meeting = $this->sch_model->update_meeting($data);
            if ($meeting) {
                $meeting=$this->sch_model->meeting_by_id($data['id']);
                //        =========================notification=============================
                $user_key=  $data2['admin_key']=$meeting['admin_key'];
                $user_key2=  $data2['user_key']=$meeting['user_key'] ;
                $data2['message']= 'has requested for meeting';
                $data2['link']= '/mentee/meeting/manage';
                $res = $this->sch_model->add_notification($data2);
//        ==================================================================
                $x= $this->sch_model->mantee_by_key($user_key);
                $email=$x['email'];$username=$x['username'];
                $x2= $this->sch_model->mantee_by_key($user_key2);
                $email2=$x2['email'];$username2=$x2['username'];
                // --------------------------------------------------------------------------------------------
                $config['charset'] = 'utf-8';
                $config['mailtype'] = 'html';
                $this->email->initialize($config);
                $this->email->from('info@mentorbaba.co', 'mentorBaba');
                $this->email->to($email);
                $this->email->subject('Meeting request approved');
                $message='<html>
			<head>
			<title>Page Title</title>
			</head>
			<body>
			<div style="border:10px solid #1f3291">
			<img style="width:200px;margin:20px" src="https://mentorbaba.co/img/logo.png" >
            <p style="font-size: 20px;margin-left:20px;">Dear '.$username.',</p>
			<p style="font-size: 20px;margin-left:20px;" >'.$username2.' sent you a meeting request on your time slot.</p>
            <br>
     
     	    <p style="text-align: right;font-size: 20px;margin-right:20px;" >Thank You</p>
            <p style="text-align: right;font-size: 20px;margin-right:20px;" >Regards</p>
			<p style="text-align: right;font-size: 25px;margin-right:20px;color:#1f3291" >mentorBaba team</p>
			</div>
			</body>
			</html>';
                $this->email->message($message);
                $this->email->send();

                // --------------------------------------------------------------------------------------------


                $this->response('Updated successfully !', 200);
            } else {
                $this->response('unable to update', 200);
            }
        }

    }
    /*=========================================================================================*/

    /*http://localhost/mentorbaba/v1/updateManteeProfileImage*/
    function updateManteeProfileImage_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        $user_key= $this->post('user_key');
        if($res && $user_key == $unique_key) {
            /*............................................*/
            /*===================================*/
            $this->load->library('image_lib');
            $config['upload_path'] = './uploads/';
            $config['allowed_types'] = '*';
            $this->load->library('upload', $config);
            $this->upload->do_upload('data');
            $upload_data = $this->upload->data();
            $image_name = $upload_data['file_name'];
            $mantee = $this->sch_model->update_mantee_profile_image($image_name, $user_key);
            if ($mantee) {
                $this->response('Updated successfully !', 200);
            } else {
                $this->response('You are no autharized', 200);
            }
        }
        else{
            $this->response('Unautharised Access!', 200);
        }
    }
    /*=========================================================================================*/

    /*http://localhost/mentorbaba/v1/updateManteeIntrestArea*/
    function updateManteeIntrestArea_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        $user_key= $this->post('user_key');
        if($res && $user_key == $unique_key){
            /*............................................*/

            $user_key = $this->post('user_key');
            $data = $this->post('data');
            $mantee = $this->sch_model->update_mantee_intrest_area($data, $user_key);
            if ($mantee) {
                $this->response('Updated successfully !', 200);
            } else {
                $this->response('You are no autharized', 200);
            }
            /*...............................................*/
        }else{
            $this->response('Unautharised Acess', 200);
        }
        /*...............................................*/
    }
    /*      http://localhost/mentorbaba/v1/orherProfile                       */

    function orherProfile_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);

        if($res){
            /*............................................*/
            $user_key= $this->post('user_key');
            $x = $this->sch_model->mantee_by_key($user_key );
            $mantee = $this->sch_model->mantee_profile_by_key($user_key );
            if ($mantee) {
                $mantee = json_decode($mantee,true);
                $mantee['type']=$x['role'];
                $this->response($mantee, 200);
            } else {
                $this->response('You are no autharized', 200);
            }
        }
        /*..................................................................*/
        else{
            $this->response('Unautharised Access!', 200);
        }
        /*.................................................................*/
    }
    /*=========================================================================================*/

    /*      http://localhost/mentorbaba/v1/manteeProfile                       */

    function manteeProfile_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        $user_key= $this->post('user_key');
        if($res){
            /*............................................*/
            $x = $this->sch_model->mantee_by_key($user_key );
            $mantee = $this->sch_model->mantee_profile_by_key($user_key );
            if ($mantee) {
                $mantee = json_decode($mantee,true);
                $mantee['type']=$x['role'];
                $this->response($mantee, 200);
            } else {
                $this->response('You are no autharized', 200);
            }
        }
        /*..................................................................*/
        else{
            $this->response('Unautharised Access!', 200);
        }
        /*.................................................................*/
    }
    /*=========================================================================================*/

    /*      http://localhost/mentorbaba/v1/manteeProfileImage                       */

    function manteeProfileImage_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        $user_key= $this->post('user_key');
        if($res ){
            /*............................................*/
            $mantee = $this->sch_model->mantee_profile_image_by_key($user_key );
            $data = base_url().'uploads/'.$mantee;
            if ($data ) {
                $this->response($data , 200);
            } else {
                $this->response('You are no autharized', 200);
            }
        }
        /*..............................................*/
        else{
            $this->response('Unautharised Access!', 200);
        }
        /*...................................................*/
    }

    /*=========================================================================================*/

    /*http://localhost/mentorbaba/v1/updateMantee        */
    function updateMantee_post()
    {
        $data['id'] = $this->post('id');
        $data['username'] = $this->post('username');
        $data['email'] = $this->post('email');
        $data['password'] = $this->post('password');
        $data['invitecode'] = $this->post('invitecode');
        $data['startup_area'] = $this->post('startup_area');
        $mantee = $this->sch_model->update_mantee($data);
        if ($mantee) {
            $this->response('Updated Successfully !', 200);
        }
        else{
            $this->response('Unable to update', 200);
        }
    }
    /*http://localhost/mentorbaba/v1/updateAccount        */
    function updateAccount_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        $unique_Key= $this->post('unique_key');
        if($res && $unique_Key == $unique_key){
            /*............................................*/
            $data= $this->post('data');
            $x = $this->sch_model->update_account($data,$unique_key);
            if($x) {
                $this->response('updated Successfully', 200);
            }else {
                $this->response('', 202);
            }
            /*...............................................*/
        }else{
            $this->response('Unautharised Acess', 200);
        }
        /*...............................................*/
    }
    /*=========================================================================================*/

    /*http://localhost/mentorbaba/v1/manteeProfileEdulist                 */

    function manteeProfileEdulist_get()
    {
        $all_startuparea = $this->sch_model->all_edu_dropdown();
        if ($all_startuparea) {
            $this->response($all_startuparea, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /*=========================================================================================*/

    /*http://localhost/mentorbaba/v1/manteeProfileExplist       */
    function manteeProfileExplist_get()
    {
        $all_startuparea = $this->sch_model->all_exp_dropdown();
        if ($all_startuparea) {
            $this->response($all_startuparea, 200);
        }
        else{
            $this->response('', 200);
        }
    }

    /*##########################################################*/
    /* STARTUP AREA */
    /*##########################################################*/
    /*=========================================================================================*/

    /*http://localhost/mentorbaba/v1/allStartuparea  */
    function allStartuparea_get()
    {
        $all_startuparea = $this->sch_model->all_startuparea();

        if ($all_startuparea) {
            $this->response($all_startuparea, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /*##########################################################*/
    /* Project Focus Area */
    /*##########################################################*/
    /*=========================================================================================*/

    /*http://localhost/mentorbaba/v1/projectFocusArea */
    function projectFocusArea_get()
    {
        $all_startuparea = $this->sch_model->all_projects_focus();

        if ($all_startuparea) {
            $this->response($all_startuparea, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /*##########################################################*/
    /* HELP AREA   */
    /*##########################################################*/
    /*=========================================================================================*/
    function test_get()
    {
        $all_helparea = $this->sch_model->help_image_by_help_key('a437341d934ec21d714758d8f68e7a01');
        print_r($all_helparea);
    }
    /*http://localhost/mentorbaba/v1/allHelpArea                */

    function allHelpArea_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        $user_key= $this->post('user_key');
        if($res){
            /*............................................*/
            $all_helparea = $this->sch_model-> all_help_sub_area_for_mentor();
            $mia = $this->sch_model->mentee_help_area_key($user_key);
            if( $mia) {
                $mia = json_decode($mia, true);
                $mia_l = count($mia);
            }
            if ($all_helparea) {
                $temp=array();
                foreach ($all_helparea as $row){
                    $hlp=$this->sch_model->help_by_help_key( $row['help_key']);
                    $row['help_name']=$hlp['name'];
                    unset($row['help_key']);
                    unset($row['help_sub_key']);
                    $row['image']=$hlp['image'];
                    $i=$row['id'];
                    if( $mia) {
                        if ($mia_l >= $i) {
                            $row['value'] = $mia[$i];
                        } else {
                            $row['value'] = "";
                        }
                        $temp[] = $row;
                    }else{
                        $row['value'] = "";
                        $temp[] = $row;

                    }
                }
                $this->response($temp, 200);
            }

            else{
                $this->response('', 200);
            }
            /*...............................................*/
        }else{
            $this->response('Unautharised Acess', 200);
        }
        /*...............................................*/
    }

    /*http://localhost/mentorbaba/v1/updateManteeIntrestArea*/
    function updateManteeHelpArea_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        $user_key= $this->post('user_key');
        if($res && $user_key == $unique_key){
            /*............................................*/

            $user_key = $this->post('user_key');
            $data = $this->post('data');
            $mantee = $this->sch_model-> update_mentee_help_sub_area_area($data, $user_key);
            if ($mantee) {
                $this->response('Updated successfully !', 200);
            } else {
                $this->response('You are no autharized', 200);
            }
            /*...............................................*/
        }else{
            $this->response('Unautharised Acess', 200);
        }
        /*...............................................*/
    }


    /*##########################################################*/
    /* INTEREST AREA   */
    /*##########################################################*/
    /*=========================================================================================*/

    /*http://localhost/mentorbaba/v1/allIntrestarea                 */

    function allIntrestarea_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        $user_key= $this->post('user_key');
        if($res){
            /*............................................*/
            $all_intrestarea = $this->sch_model->all_intrestarea();
            $mia = $this->sch_model->mantee__intrest_area_key($user_key);
            if( $mia) {
                $mia = json_decode($mia, true);
                $mia_l = count($mia);
            }
            if ($all_intrestarea) {
                $temp=array();
                foreach ($all_intrestarea as $row){
                    $i=$row['id'];
                    if( $mia) {
                        if ($mia_l >= $i) {
                            $row['value'] = $mia[$i];
                        } else {
                            $row['value'] = "";
                        }
                        $temp[] = $row;
                    }else{
                        $row['value'] = "";
                        $temp[] = $row;

                    }
                }
                $this->response($temp, 200);
            }

            else{
                $this->response('', 200);
            }
            /*...............................................*/
        }else{
            $this->response('Unautharised Acess', 200);
        }
        /*...............................................*/
    }
    /*=========================================================================================*/

    /*http://localhost/mentorbaba/v1/allIntrestareaforPost                 */

    function allIntrestareaforPost_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        $user_key= $this->post('user_key');
        if($res && $user_key == $unique_key){
            /*............................................*/
            $all_intrestarea = $this->sch_model->all_intrestarea();

            if ($all_intrestarea) {
                $temp=array();
                foreach ($all_intrestarea as $row){
                    $row['value'] = "";
                    $temp[] = $row;
                }
                $this->response($temp, 200);
            }

            else{
                $this->response('', 200);
            }
            /*...............................................*/
        }else{
            $this->response('Unautharised Acess', 200);
        }
        /*...............................................*/
    }


    /*##########################################################*/
    /* PROJECTS */
    /*##########################################################*/

    /*=========================================================================================*/

    /* http://localhost/mentorbaba/v1/addProject   */
    function addProject_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        $user_key= $this->post('user_key');
        if($res && $user_key == $unique_key){
            /*............................................*/
            $pro_key= $this->post('pro_key');
            if($pro_key){
                $data = $this->post('data');
                unset($data['term']);
                $proj = $this->sch_model->update_project($pro_key,$data);
                if ($proj) {
                    $this->response('Added Successfully !', 200);
                }
                else{
                    $this->response('Unable to Register', 200);
                }
            }else{
                $user_key= $this->post('user_key');
                $data = $this->post('data');

                $data['submited']=$this->post('submited');
                $data['status']="pending";
                unset($data['term']);
                $proj = $this->sch_model->add_project($user_key,$data);
                if ($proj) {
                    $x= $this->sch_model->mantee_by_key($user_key);
                    $email=$x['email'];$username=$x['username'];
                    // --------------------------------------------------------------------------------------------
                    $config['charset'] = 'utf-8';
                    $config['mailtype'] = 'html';
                    $this->email->initialize($config);
                    $this->email->from('info@mentorbaba.co', 'mentorBaba');
                    $this->email->to($email);
                    $this->email->subject('Project Submitted (#PITCHIT)');
                    $message='<html>
			<head>
			<title>Page Title</title>
			</head>
			<body>
			<div style="border:10px solid #1f3291">
			<img style="width:200px;margin:20px" src="https://mentorbaba.co/img/logo.png" >
            <p style="font-size: 20px;margin-left:20px;">Dear '.$username.',</p>
			<p style="font-size: 20px;margin-left:20px;" >Your project has been submitted successfully. You can check out it’s status under #PITCHIT from  your mentorBaba portal.</p>
            <br>
     
     	    <p style="text-align: right;font-size: 20px;margin-right:20px;" >Thank You</p>
            <p style="text-align: right;font-size: 20px;margin-right:20px;" >Regards</p>
			<p style="text-align: right;font-size: 25px;margin-right:20px;color:#1f3291" >mentorBaba team</p>
			</div>
			</body>
			</html>';
                    $this->email->message($message);
                    $this->email->send();

                    // --------------------------------------------------------------------------------------------
                    $this->response('Added Successfully !', 200);
                }
                else{
                    $this->response('Unable to Register', 200);
                }
            }
            /*...............................................*/
        }else{
            $this->response('Unautharised Acess', 200);
        }
        /*...............................................*/
    }

    /*=========================================================================================*/

    /* http://localhost/mentorbaba/v1/allProjectOfMantee   */
    function allProjectOfMantee_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        $user_key= $this->post('user_key');
        if($res && $user_key == $unique_key){
            /*............................................*/
            $projects = $this->sch_model->projects_by_user_key($user_key);
            $response=array();
            if ($projects) {
                foreach ($projects as $row){
                    $temp=array();
                    $temp['id'] = $row['pro_key'];
                    $temp['user_key'] = $row['user_key'];
                    $temp['status'] = $row['status'];
                    $temp['image'] = base_url() . 'uploads/' . $row['image'];
                    $temp['submited'] = $row['submited'];
                    $temp['projName'] = $row['projName'];
                    $temp['problum'] = substr($row['problum'],0,200);
                    array_push($response, $temp);
                }
                $this->response($response, 200);
            }
            else{
                $this->response('', 200);
            }
            /*...............................................*/
        }else{
            $this->response('Unautharised Acess', 200);
        }
        /*...............................................*/
    }
    /*=========================================================================================*/
    /*=========================================================================================*/

    /* http://localhost/mentorbaba/v1/menteeProjDropdown  */
    function menteeProjDropdown_post()
    {
        $user_key= $this->post('user_key');
        $projects = $this->sch_model->approved_projects_by_user_key($user_key);
        $response=array();
        if ($projects) {
            foreach ($projects as $row){
                $temp=array();
                $temp['id'] = $row['pro_key'];
                $temp['name'] = $row['projName'];

                array_push($response, $temp);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }

    }
    /*=========================================================================================*/

    /* http://localhost/mentorbaba/v1/allApprovedProjectOfMantee   */
    function allApprovedProjectOfMantee_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        $user_key= $this->post('user_key');
        if($res){
            $req_key= $this->post('req_key');
            /*............................................*/
            $projects = $this->sch_model->appproved_projects_by_user_key($user_key);
            $response=array();
            if ($projects) {
                foreach ($projects as $row){
                    $temp=array();
                    $temp['id'] = $row['pro_key'];
                    $temp['user_key'] = $row['user_key'];
                    $temp['status'] = $row['status'];
                    $temp['image'] = base_url() . 'uploads/' . $row['image'];
                    $temp['submited'] = $row['submited'];
                    $temp['projName'] = $row['projName'];
                    $temp['problum'] = substr($row['problum'],0,200);
                    /*........................ for request to view.......................*/
                    $temp['permited'] =false;
                    $data4['project_key']= $temp['id'];
                    $data4['req_key']=$req_key;
                    $x = $this->sch_model->check_peoject_view_request_status($data4);
                    if($x){
                        $temp['requestStatus'] = true;
                        if($x['status']=='0'){$temp['permited'] =false;}else{$temp['permited'] =true;}
                    }else{$temp['requestStatus'] = false;}

                    $temp['requestData'] ='' ;
                    $temp['showForm'] = false;
                    /*...............................................*/

                    array_push($response, $temp);
                }
                $this->response($response, 200);
            }
            else{
                $this->response('', 200);
            }
            /*...............................................*/
        }else{
            $this->response('Unautharised Acess', 200);
        }
        /*...............................................*/
    }
    /*=========================================================================================*/

    /* http://localhost/mentorbaba/v1/projectByKey*/
    function projectByKey_post()
    {
//            $user_key= $this->post('user_key');
        $user_key= $this->post('pro_key');
        $projects = $this->sch_model->projects_by_pro_key($user_key);
        if ($projects) {
            $this->response($projects, 200);
        }
        else{
            $this->response($user_key, 200);
        }

        /*...............................................*/
    }

    /*=========================================================================================*/

    /*      http://localhost/mentorbaba/v1/manteeProfileImage                       */

    function projectImage_post()
    {
        /*---------------------------------------------*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $role=$DecodeToken['usertype'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        /*---------------------------------------------*/
        if($res) {
            $pro_key = $this->post('pro_key');
            $proj = $this->sch_model->proj_image_by_key($pro_key );
            $data = base_url().'uploads/'.$proj;
            if ($data ) {
                $this->response($data , 200);
            } else {
                $this->response('You are no autharized', 200);
            }
        }
        else{
            $this->response('Unautharised Access!', 200);
        }
    }

    /*http://localhost/mentorbaba/v1/updateManteeProfileImage*/
    function updateprojectImage_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        $user_key= $this->post('user_key');
        if($res && $user_key == $unique_key) {
            /*............................................*/

            $pro_key = $this->post('pro_key');
            if ($pro_key) {
                /*===================================*/
                $this->load->library('image_lib');
                $config['upload_path'] = './uploads/';
                $config['allowed_types'] = 'gif|jpg|png';
                $this->load->library('upload', $config);
                $this->upload->do_upload('data');
                $upload_data = $this->upload->data();
                $image_name = $upload_data['file_name'];
                /*===================================*/
                $mantee = $this->sch_model->update_project_image($image_name, $pro_key);
                if ($mantee) {
                    $this->response('Updated successfully !', 200);
                } else {
                    $this->response('You are no autharized', 200);
                }
            }
        }
        else{
            $this->response('Unautharised Access!', 200);
        }
    }


    /*##########################################################*/
    /* MEETING */
    /*##########################################################*/
    /*=========================================================================================*/


    /* http://localhost/mentorbaba/v1/addMeeting   */
    function addMeeting_post()
    {
        $data= $this->post();

        $meeting = $this->sch_model->add_meeting($data);
        if ($meeting) {
            $this->response('Added Successfully !', 200);
        }
        else{
            $this->response('Unable to Register', 200);
        }
    }

    /* http://localhost/mentorbaba/v1/addMeeting   */
    function allMeetingOfAdmin_post()
    {
        $key= $this->post('admin_key');
        $meeting = $this->sch_model->all_meeting_of_admin($key);
        if ($meeting) {
            $this->response($meeting, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/upcomming  */
    function upcommingMeeting_post()
    {
        $key= $this->post('admin_key');
        $meeting = $this->sch_model->upcomming_meeting($key);
        $response=array();
        if ($meeting) {
            foreach ($meeting as $row){
                $profile=$this->sch_model->mantee_profile_by_key($row['admin_key']);
                $user=$this->sch_model->mantee_by_key($row['admin_key']);
                $profile=json_decode($profile,true);
                $row['name']=$profile['name'];
                $row['skype_id']=$user['skype_id'];
                $row['audio']='skype:'.$user['skype_id'].'?call';
                $row['video']='skype:'.$user['skype_id'].'?call&amp;video=true';
                $row['voicemail']='skype:'.$user['skype_id'].'?voicemail';
                $row['chat']='skype:'.$user['skype_id'].'?chat';
                $row['sendfile']='skype:'.$user['skype_id'].'?sendfile';
                $row['image']= base_url() . 'uploads/' . $user['profile_img'];
                array_push($response, $row);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/rejectedMeeting  */
    function rejectedMeeting_post()
    {
        $key= $this->post('admin_key');
        $meeting = $this->sch_model->rejected_meeting($key);
        $response=array();
        if ($meeting) {
            foreach ($meeting as $row){
                $profile=$this->sch_model->mantee_profile_by_key($row['admin_key']);
                $image=$this->sch_model->mantee_by_key($row['admin_key']);
                $profile=json_decode($profile,true);
                $row['name']=$profile['name'];
                $row['image']= base_url() . 'uploads/' . $image['profile_img'];
                array_push($response, $row);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/deleteRejectedMeeting */
    function deleteRejectedMeeting_post()
    {
        $id= $this->post('id');
        $meeting = $this->sch_model->delete_rejected_meeting($id);

        if ($meeting) {
            $this->response('deleted Successfully', 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/upcomming  */
    function manageMeeting_post()
    {
        $key= $this->post('user_key');
        $meeting = $this->sch_model->manage_meeting($key);
        $response=array();
        if ($meeting) {
            foreach ($meeting as $row){
                $profile=$this->sch_model->mantee_profile_by_key($row['user_key']);
                $user=$this->sch_model->mantee_by_key($row['user_key']);
                $profile=json_decode($profile,true);
                $row['name']=$profile['name'];
                $row['name']=$profile['name'];
                $row['skype_id']=$user['skype_id'];
                $row['audio']='skype:'.$user['skype_id'].'?call';
                $row['video']='skype:'.$user['skype_id'].'?call&amp;video=true';
                $row['voicemail']='skype:'.$user['skype_id'].'?voicemail';
                $row['chat']='skype:'.$user['skype_id'].'?chat';
                $row['sendfile']='skype:'.$user['skype_id'].'?sendfile';
                $row['image']= base_url() . 'uploads/' . $user['profile_img'];
                array_push($response, $row);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/acceptMeetingByAdmin */
    function acceptMeetingByAdmin_post()
    {
        $id= $this->post('id');
        $meeting=$this->sch_model->meeting_by_id($id);
        //        =========================notification=============================
        $user_key=$data2['admin_key']=$meeting['user_key'];
        $user_key2= $data2['user_key']=$meeting['admin_key'] ;
        $data2['message']= 'has accepted your meeting';
        $data2['link']= '/mentee/meeting/upcoming';
        $res = $this->sch_model->add_notification($data2);
//        ==================================================================
        $meeting = $this->sch_model->accept_meeting_by_admin($id);
        if ($meeting) {
            $x= $this->sch_model->mantee_by_key($user_key);
            $email=$x['email'];$username=$x['username'];
            $x2= $this->sch_model->mantee_by_key($user_key2);
            $email2=$x2['email'];$username2=$x2['username'];
            // --------------------------------------------------------------------------------------------
            $config['charset'] = 'utf-8';
            $config['mailtype'] = 'html';
            $this->email->initialize($config);
            $this->email->from('info@mentorbaba.co', 'mentorBaba');
            $this->email->to($email);
            $this->email->subject('Meeting request approved');
            $message='<html>
			<head>
			<title>Page Title</title>
			</head>
			<body>
			<div style="border:10px solid #1f3291">
			<img style="width:200px;margin:20px" src="https://mentorbaba.co/img/logo.png" >
            <p style="font-size: 20px;margin-left:20px;">Dear '.$username.',</p>
			<p style="font-size: 20px;margin-left:20px;" >'.$username2.' has accepted your meeting.</p>
            <br>
     
     	    <p style="text-align: right;font-size: 20px;margin-right:20px;" >Thank You</p>
            <p style="text-align: right;font-size: 20px;margin-right:20px;" >Regards</p>
			<p style="text-align: right;font-size: 25px;margin-right:20px;color:#1f3291" >mentorBaba team</p>
			</div>
			</body>
			</html>';
            $this->email->message($message);
            $this->email->send();

            // --------------------------------------------------------------------------------------------

            $this->response('Accepted Successfully', 200);
        }
        else{
            $this->response('Unable to Accept', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/acceptMeetingByAdmin */
    function rejectMeetingByAdmin_post()
    {
        $data= $this->post('data');
        $meeting=$this->sch_model->meeting_by_id($data['id']);
        //        =========================notification=============================
        $user_key= $data2['admin_key']=$meeting['user_key'];
        $user_key2=$data2['user_key']=$meeting['admin_key'] ;
        $data2['message']= 'has rejected your meeting';
        $data2['link']= '/mentee/meeting/upcoming';
        $res = $this->sch_model->add_notification($data2);
//        ==================================================================
        $meeting = $this->sch_model->reject_meeting_by_admin($data);
        if ($meeting) {
            $x= $this->sch_model->mantee_by_key($user_key);
            $email=$x['email'];$username=$x['username'];
            $x2= $this->sch_model->mantee_by_key($user_key2);
            $email2=$x2['email'];$username2=$x2['username'];
            // --------------------------------------------------------------------------------------------
            $config['charset'] = 'utf-8';
            $config['mailtype'] = 'html';
            $this->email->initialize($config);
            $this->email->from('info@mentorbaba.co', 'mentorBaba');
            $this->email->to($email);
            $this->email->subject('Meeting request not accepted');
            $message='<html>
			<head>
			<title>Page Title</title>
			</head>
			<body>
			<div style="border:10px solid #1f3291">
			<img style="width:200px;margin:20px" src="https://mentorbaba.co/img/logo.png" >
            <p style="font-size: 20px;margin-left:20px;">Dear '.$username.',</p>
			<p style="font-size: 20px;margin-left:20px;" >'.$username2.' has rejected your meeting</p>
            <br>
     
     	    <p style="text-align: right;font-size: 20px;margin-right:20px;" >Thank You</p>
            <p style="text-align: right;font-size: 20px;margin-right:20px;" >Regards</p>
			<p style="text-align: right;font-size: 25px;margin-right:20px;color:#1f3291" >mentorBaba team</p>
			</div>
			</body>
			</html>';
            $this->email->message($message);
            $this->email->send();

            // --------------------------------------------------------------------------------------------

            $this->response('Rejected Successfully', 200);
        }
        else{
            $this->response('Unable to Reject', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/acceptMeetingByAdmin */
    function cancelMeetingByUser_post()
    {
        $id= $this->post('id');
        $meeting=$this->sch_model->meeting_by_id($id);
        //        =========================notification=============================
        $data2['admin_key']=$meeting['admin_key'];
        $data2['user_key']=$meeting['user_key'] ;
        $data2['message']= 'has canceled his / her meeting itself before your acceptance ';
        $data2['link']= '';
        $res = $this->sch_model->add_notification($data2);
//        ==================================================================
        $meeting = $this->sch_model->cancel_meeting_by_user($id);
        if ($meeting) {

            $this->response('Canceled Successfully', 200);
        }
        else{
            $this->response('Unable to Cancel', 200);
//            $this->response('Unable to Cancel', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/addMeeting   */
    function deleteMeeting_post()
    {
        $id= $this->post('id');
        $meeting = $this->sch_model->deleteMeeting_of_admin($id);
        if ($meeting) {
            $this->response($meeting, 200);
        }
        else{
            $this->response('no data found', 200);
        }
    }
    /*##########################################################*/
    /* POSTS */
    /*##########################################################*/


    /*http://localhost/mentorbaba/v1/addPost*/
    function addPost_post()
    {
        /*............................................*/
        $data['user_key']= $this->post('user_key');
        $cat  = $this->post('category');
        $img_count  = $this->post('img_count');
        $cat= ltrim($cat, '[');
        $cat= rtrim($cat, ']');
        $data['category']=  $cat;
        $data['title']= 'no title';
        $data['description']= $this->post('description');
        $data['video']= $this->post('video');
        $data['post_key']= md5(rand());
        //  =========================notification=============================
        $data3['admin_key']=$data['user_key'];
        $x = $this->sch_model->all_follow_of_user($data3);
        $l=count($x);
        for($i=0;$i<$l;$i++){
            $data2['admin_key']=$x[$i];
            $data2['user_key']=$data['user_key'] ;
            $data2['message']= 'has added a post';
            $data2['link']= '/mentee/profile/'.$data['user_key'];
            $this->sch_model->add_notification($data2);
        }
//        ==================================================================
        if ($data['user_key']) {
            /*===================================*/
            $this->load->library('image_lib');
            $config['upload_path'] = './uploads/';
            $config['allowed_types'] = 'gif|jpg|png';
            $this->load->library('upload', $config);
            /*............................*/
            $this->upload->do_upload('photo1');
            $upload_data1 = $this->upload->data();
            if($img_count >=1){$data['photo1']=$upload_data1['file_name'];}
            /*............................*/
            $this->upload->do_upload('photo2');
            $upload_data2 = $this->upload->data();
            if($img_count >=2){$data['photo2']=$upload_data2['file_name'];}
            /*............................*/
            $this->upload->do_upload('photo3');
            $upload_data3 = $this->upload->data();
            if($img_count >=3){$data['photo3']=$upload_data3['file_name'];}
            /*............................*/
            $this->upload->do_upload('photo4');
            $upload_data4 = $this->upload->data();
            if($img_count >=4){$data['photo4']=$upload_data4['file_name'];}
            /*===================================*/
            $mantee = $this->sch_model->add_post($data);
            if ($mantee) {
                $this->response('Updated successfully !', 200);
            } else {
                $this->response('You are no autharized', 200);
            }
        }

    }
    /* http://localhost/mentorbaba/v1/allPost   */
    function allPost_post()
    {
        /*...........................................*/
        $head=  $this->input->get_request_header('Authorization');
        $x= (explode(" ",$head));
        $token= $x[1];
        $DecodeToken = $this->objOfJwt->DecodeToken($token);
        $unique_key=$DecodeToken['unique_key'];
        $data1=array('jwt'=>$token);
        $res=$this->sch_model->verify_jwt($data1);
        $user_key= $this->post('user_key');
        if($res && $user_key == $unique_key){
            /*............................................*/
            $key= $this->post('user_key');

            $limit= 5;
            $start= $this->post('start');
            $allpost = $this->sch_model->all_post_for_dashboard($limit,$start,$key);
            $response=array();
            $res=array();
            $last_id=0;
            if ($allpost) {
                foreach ($allpost as $row){
                    $temp=array();
                    $temp['user_key'] = $row['user_key'];
                    $data3=array('admin_key'=>$row['user_key'],'user_key'=>$key);
                    $follow=$this->sch_model->is_follow($data3);
                    if($follow ==1){   $temp['follow'] = true; }else{   $temp['follow'] = false;}
                    $mantee = $this->sch_model->mantee_by_key($row['user_key']);
                    $temp['username'] = $mantee['username'];
                    $temp['image'] =  base_url() . 'uploads/' . $mantee['profile_img'];
                    $temp['role'] = $mantee['role'];
                    $profile = json_decode($mantee['profile'],true);
                    $temp['name'] = $profile['name'];
                    $last_id=$temp['id'] = $row['id'];

                    $temp['post_key'] = $row['post_key'];
                    $temp['description'] = $row['description'];
                    if($row['photo1']) {
                        $temp['photo1'] = base_url() . 'uploads/' . $row['photo1'];
                    }
                    if($row['photo2']) {
                        $temp['photo2'] = base_url() . 'uploads/' . $row['photo2'];
                    }
                    if($row['photo3']) {
                        $temp['photo3'] = base_url() . 'uploads/' . $row['photo3'];
                    }
                    if($row['photo4']) {
                        $temp['photo4'] = base_url() . 'uploads/' . $row['photo4'];
                    }
                    $temp['video'] = $row['video'];
                    $temp['date'] = $row['date'];
                    $cat= explode(",",$row['category']);
                    $c=array();
                    for($i=0;$i<count($cat);$i++){
                        $c[]= $this->sch_model->intrestarea_name_by_id($cat[$i]). '';
                    }

                    $data4=array('post_key'=>$row['post_key'],'user_key'=>$key);
                    $data5=array('post_key'=>$row['post_key']);
                    $is_like=$this->sch_model->is_post_like($data4);
                    $temp['like'] =$this->sch_model->all_post_like_count($data5);
                    if($is_like==0){ $temp['like_status'] = false;  }else{$temp['like_status'] =  true ;}
                    $temp['category']=$c;
                    $temp['comment_write']="";
                    $temp['comment'] =$this->sch_model->all_post_comment_count($data5);
                    $temp['comment_limit'] =0;
                    $temp['all_comment'] ='';
                    $temp['show_comment'] =false;
                    $temp['show_more'] =false;
                    /*--------------profile-detail-----------------*/

                    array_push($response, $temp);
                }

                $res['last_id']=$last_id;
                $res['data']=$response;

                $this->response($res, 200);
            }
            else{
                $this->response('Unable to Register', 200);
            }
            /*...............................................*/
        }else{
            $this->response('Unautharised Acess', 200);
        }
        /*...............................................*/
    }
    /* http://localhost/mentorbaba/v1/manteeAllPost*/
    function manteeAllPost_post()
    {
        /*...........................................*/
//        $head=  $this->input->get_request_header('Authorization');
//        $x= (explode(" ",$head));
//        $token= $x[1];
//        $DecodeToken = $this->objOfJwt->DecodeToken($token);
//        $unique_key=$DecodeToken['unique_key'];
//        $data1=array('jwt'=>$token);
//        $res=$this->sch_model->verify_jwt($data1);
//        $user_key= $this->post('user_key');
//        if($res ){
        /*............................................*/

        $limit= 2;
        $start= $this->post('start');
        $user_key= $this->post('user_key');
        $key1= $this->post('user_key_of_admin');
        $allpost = $this->sch_model->mantee_all_post_for_dashboard($limit,$start,$user_key);
        $post_count = $this->sch_model->mantee_all_post_for_dashboard_count($user_key);
        $response=array();
        $res=array();
        $last_id=0;
        if ($allpost) {
            foreach ($allpost as $row){
                $temp=array();
                $temp['user_key'] = $row['user_key'];
                $mantee = $this->sch_model->mantee_by_key($row['user_key']);
                $temp['username'] = $mantee['username'];
                $temp['image'] =  base_url() . 'uploads/' . $mantee['profile_img'];
                $temp['role'] = $mantee['role'];
                $profile = json_decode($mantee['profile'],true);
                $temp['name'] = $profile['name'];
                $last_id=$temp['id'] = $row['id'];
                $temp['post_key'] = $row['post_key'];
                $temp['description'] = $row['description'];
                if($row['photo1']) {
                    $temp['photo1'] = base_url() . 'uploads/' . $row['photo1'];
                }
                if($row['photo2']) {
                    $temp['photo2'] = base_url() . 'uploads/' . $row['photo2'];
                }
                if($row['photo3']) {
                    $temp['photo3'] = base_url() . 'uploads/' . $row['photo3'];
                }
                if($row['photo4']) {
                    $temp['photo4'] = base_url() . 'uploads/' . $row['photo4'];
                }
                $temp['video'] = $row['video'];
                $temp['date'] = $row['date'];
                $cat= explode(",",$row['category']);
                $c=array();
                for($i=0;$i<count($cat);$i++){
                    $c[]= $this->sch_model->intrestarea_name_by_id($cat[$i]). '';
                }
                $data4=array('post_key'=>$row['post_key'],'user_key'=>$key1);
                $data5=array('post_key'=>$row['post_key']);
                $is_like=$this->sch_model->is_post_like($data4);
                $temp['like'] =$this->sch_model->all_post_like_count($data5);
//                    $temp['like_status'] =json_encode($data4);
                if($is_like==0){ $temp['like_status'] = false;  }else{$temp['like_status'] =  true ;}
                $temp['category']=$c;
                $temp['comment_write']="";
                $temp['comment'] =$this->sch_model->all_post_comment_count($data5);
                $temp['comment_limit'] =0;
                $temp['all_comment'] ='';
                $temp['show_comment'] =false;
                $temp['show_more'] =false;
                /*--------------profile-detail-----------------*/
                array_push($response, $temp);
            }

            $res['last_id']=$last_id;
            $res['data']=$response;
            $res['postCount']=$post_count;

            $this->response($res, 200);
        }
        else{
            $this->response('Unable to Register', 200);
        }
        /*...............................................*/
//        }else{
//            $this->response('Unautharised Acess', 200);
//        }
        /*...............................................*/
    }

    /*=========================================================================================*/

    /* http://localhost/mentorbaba/v1/deletePost   */
    function deletePost_post()
    {
        $id= $this->post('id');

        $res = $this->sch_model->delete_post($id);
        if ($res) {
            $this->response('Deleted Successfully !', 200);
        }
        else{
            $this->response('Unable to Deleted Successfully', 200);
        }
    }
    /*##########################################################*/
    /* CHAT CONTACT */
    /*##########################################################*/
    /*=========================================================================================*/

    /* http://localhost/mentorbaba/v1/addChatContact   */
    function addChatContact_post()
    {
        $data['admin_key']= $this->post('admin_key');
        $data['user_key']= $this->post('user_key');
        $res = $this->sch_model->add_chat_contact($data);
        if ($res) {
            $this->response('Contact Added Successfully !', 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/addChatContact   */
    function chatContactExist_post()
    {
        $data['admin_key']= $this->post('admin_key');
        $data['user_key']= $this->post('user_key');
        $res = $this->sch_model->contact_exist($data);
        if ($res) {
            $this->response(true, 200);
        }
        else{
            $this->response(false, 200);
        }
    }
    /* http://localhost/mentorbaba/v1/chatContactList   */
    function chatContactList_post()
    {
        $data['admin_key']= $this->post('admin_key');
        $res = $this->sch_model->all_chat_contact_of_admin($data);
        if ($res) {
            $response=array();
            foreach ($res as $row){
                $user=$this->sch_model->mantee_by_key($row['user_key']);
                $name=json_decode($user['profile'],true);
                $row['name']=$name['name'];
                $row['user_name']=$user['username'];
                $row['image'] = base_url() . 'uploads/' . $user['profile_img'];
                $row['login_status'] = $user['login_status'];
                $row['last_login'] =   $user['updated_at'];
                $row['role'] = $user['role'];
                $data2=array('admin_key'=>$data['admin_key'],'user_key'=>$row['user_key']);
                $row['unread_msg'] = $this->sch_model->unread_message_individual($data2);
                array_push($response, $row);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/chatContactList   */
    function chatProfile_post()
    {
        $key= $this->post('unique_key');
        $user=$this->sch_model->mantee_by_key($key);
        if ($user) {
            $response=array();
            $name=json_decode($user['profile'],true);
            $user['name']=$name['name'];
            $user['image'] = base_url() . 'uploads/' . $user['profile_img'];
            unset($user['intrest_area']);
            unset($user['invitecode']);
            unset($user['jwt']);
            unset($user['password']);
            unset($user['profile']);
            unset($user['startuparea']);
            $this->response($user, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/chatContactList   */
    function chatRoom_post()
    {
        $data['admin_key']= $this->post('admin_key');
        $data['user_key']= $this->post('user_key');
        $room =$this->sch_model->get_chat_room($data);
        if ($room) {

            $this->response($room, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /*##########################################################*/
    /* CHAT MESSAGE */
    /*##########################################################*/
    /* http://localhost/mentorbaba/v1/addChatMessage   */
    function addChatMessage_post()
    {
        $data['admin_key']= $this->post('admin_key');
        $data['user_key']= $this->post('user_key');
        $data['message']= $this->post('message');
        $data['room']= $this->post('room');



        $res = $this->sch_model->add_chat_message($data);
        if ($res) {
            $this->response('message Added Successfully !', 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/allChatMessage   */
    function allChatMessage_post()
    {
//        $admin_key= $this->post('admin_key');
//        $user_key= $this->post('user_key');
        $data['room']=$this->post('room');

        $res = $this->sch_model->all_chat_message($data);
        if ($res) {
            $this->response($res, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/deletrChatMessage   */
    function deletrChatMessage_post()
    {
        $id=$this->post('id');
        $res = $this->sch_model->delete_chat_message($id);
        if ($res) {
            $this->response('delete successfully', 200);
        }
        else{
            $this->response('', 200);
        }
    }
    function updateChatMessage_post()
    {
        $data['admin_key']= $this->post('admin_key');
        $data['user_key']= $this->post('user_key');
        $res = $this->sch_model->update_message_status_to_read($data);
        if ($res) {
            $this->response('updated successfully', 200);
        }
        else{
            $this->response('', 200);
        }
    }
    function allUnreadMessage_post()
    {
        $data['admin_key']= $this->post('admin_key');
        $res = $this->sch_model->unread_message_individual($data);
        if ($res) {
            $this->response($res, 200);
        }
        else{
            $this->response('0', 200);
        }
    }
    /*##########################################################*/
    /* FOLLOW */
    /*##########################################################*/
    /* http://localhost/mentorbaba/v1/addFollow   */
    function addFollow_post()
    {
        $data['admin_key']= $this->post('admin_key');
        $data['user_key']= $this->post('user_key');
        $res = $this->sch_model->add_follow($data);
//        =========================notification=============================
        $data2['admin_key']=$data['admin_key'];
        $data2['user_key']=$data['user_key'] ;
        $data2['message']= 'has follow you';
        $data2['link']= '/mentee/profile/'.$data['admin_key'];
        $res = $this->sch_model->add_notification($data2);
//        ==================================================================
        if ($res) {
            $this->response('follow successfully', 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/isFollow  */
    function isFollow_post()
    {
        $data['admin_key']= $this->post('admin_key');
        $data['user_key']= $this->post('user_key');

        $res = $this->sch_model->is_follow($data);
        if ($res) {
            $this->response(true, 200);
        }
        else{
            $this->response(false, 200);
        }
    }
    /* http://localhost/mentorbaba/v1/allFollowCount  */
    function allFollowCount_post()
    {
        $data['admin_key']= $this->post('admin_key');
        $res = $this->sch_model->all_follow_of_user_count($data);
        if ($res) {
            $this->response($res, 200);
        }
        else{
            $this->response(0, 200);
        }
    }
    /*##########################################################*/
    /* POST LIKE */
    /*##########################################################*/
    /* http://localhost/mentorbaba/v1/addPostLike   */
    function addPostLike_post()
    {
        $data['post_key']= $this->post('post_key');
        $data['user_key']= $this->post('user_key');
        $post_user_key=$this->sch_model->post_user_key($data['post_key']);
        $res = $this->sch_model->add_post_like($data);
        if ($res) {
            //        =========================notification=============================
            $data2['admin_key']=$post_user_key;
            $data2['user_key']=$data['user_key'];
            $data2['message']= "has liked your  post";
            $data2['link']= '/mentee/profile/'.$post_user_key;
            $res = $this->sch_model->add_notification($data2);
//        ==================================================================
            $this->response('liked successfully', 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/isFollow  */
    function isPostLike_post()
    {
        $data['post_key']= $this->post('post_key');
        $data['user_key']= $this->post('user_key');

        $res = $this->sch_model->is_post_like($data);
        if ($res) {
            $this->response(true, 200);
        }
        else{
            $this->response(false, 200);
        }
    }
    /* http://localhost/mentorbaba/v1/allFollowCount  */
    function allPostLikeCount_post()
    {
        $data['post_key']= $this->post('post_key');
        $res = $this->sch_model->all_post_like_count($data);
        if ($res) {
            $this->response($res, 200);
        }
        else{
            $this->response(0, 200);
        }
    }
    /*##########################################################*/
    /* POST COMMENT */
    /*##########################################################*/
    /* http://localhost/mentorbaba/v1/addPostComment   */
    function addPostComment_post()
    {
        $data['post_key']= $this->post('post_key');
        $data['user_key']= $this->post('user_key');
        $admin_key= $this->post('admin_key');
        $data['comment']= $this->post('comment');
        $res = $this->sch_model->add_post_comment($data);
        if ($res) {
//        =========================notification=============================
            $data2['admin_key']=$admin_key;
            $data2['user_key']=$data['user_key'];
            $data2['message']= 'has commented on your post';
            $data2['link']= '/mentee/profile/'.$admin_key;
            $res = $this->sch_model->add_notification($data2);
//        ==================================================================
            $this->response('added successfully', 200);
        }
        else{
            $this->response('Unable to add', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/updatePostComment   */
    function updatePostComment_post()
    {
        $data['id']= $this->post('id');
        $data['reply']= $this->post('reply');
        $res = $this->sch_model->update_post_comment($data);
        if ($res) {
            $this->response('updated successfully', 200);
        }
        else{
            $this->response('Unable to add', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/allPostComment   */
    function allPostComment_post()
    {
        $data['post_key']= $this->post('post_key');
        $res  =$this->sch_model->all_post_comment($data);
        $response=array();
        if ($res) {
            foreach ($res as $row){
//                 $temp= array();
//                 $temp['id']= $row['id'];
                $user=$this->sch_model->mantee_by_key($row['user_key']);
                $name=json_decode($user['profile'],true);
                $row['name']=$name['name'];
                $row['user_name']=$user['username'];
                $row['image'] = base_url() . 'uploads/' . $user['profile_img'];
                $row['login_status'] = $user['login_status'];
                $row['last_login'] =   $user['updated_at'];
                $row['role'] = $user['role'];
                $row['reply'] = '';
                $data2=array('comment_id'=>$row['id']);
                $row['reply_count'] = $this->sch_model->all_post_comment_reply_count($data2);
                $row['reply_write'] = '';
                $row['reply_show'] = false;
                array_push($response, $row);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /*##########################################################*/
    /* POST COMMENT REPLY*/
    /*##########################################################*/
    /* http://localhost/mentorbaba/v1/addPostCommentReply  */
    function addPostCommentReply_post()
    {
        $data['post_key']= $this->post('post_key');
        $data['user_key']= $this->post('user_key');
        $admin_key= $this->post('admin_key');
        $data['comment_id']= $this->post('comment_id');
        $data['reply']= $this->post('reply');
        $post_user_key=$this->sch_model->post_user_key($data['post_key']);
        $post_owner=$this->sch_model->mantee_by_key($post_user_key);
        $res = $this->sch_model->add_post_comment_reply($data);
        if ($res) {
            //        =========================notification=============================
            $data2['admin_key']=$admin_key;
            $data2['user_key']=$data['user_key'];
            $data2['message']= "has replied on your comment  of @".$post_owner['username']."'s post";
            $data2['link']= '/mentee/profile/'.$post_user_key;
            $res = $this->sch_model->add_notification($data2);
//        ==================================================================
            $this->response('added successfully', 200);
        }
        else{
            $this->response('Unable to add', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/allPostCommentReply  */
    function allPostCommentReply_post()
    {
        $data['post_key']= $this->post('post_key');
        $data['comment_id']= $this->post('comment_id');
        $res  =$this->sch_model->all_post_comment_reply($data);
        $response=array();
        if ($res) {
            foreach ($res as $row){
                $user=$this->sch_model->mantee_by_key($row['user_key']);
                $name=json_decode($user['profile'],true);
                $row['name']=$name['name'];
                $row['user_name']=$user['username'];
                $row['image'] = base_url() . 'uploads/' . $user['profile_img'];
                $row['login_status'] = $user['login_status'];
                $row['last_login'] =   $user['updated_at'];
                $row['role'] = $user['role'];
                array_push($response, $row);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /*##########################################################*/
    /*  notification*/
    /*##########################################################*/
    /* http://localhost/mentorbaba/v1/addNotification  */
    function addNotification_post()
    {
        $data['admin_key']= $this->post('admin_key');
        $data['user_key']= $this->post('user_key');
        $data['message']= $this->post('message');
        $data['link']= $this->post('link');
        $res = $this->sch_model->add_notification($data);
        if ($res) {
            $this->response('added successfully', 200);
        }
        else{
            $this->response('Unable to add', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/allNotification  */
    function allNotification_post()
    {
        $data['admin_key']= $this->post('admin_key');

        $res  =$this->sch_model->all_notification_of_user($data);

        $response=array();
        if ($res) {
            foreach ($res as $row){
                $user=$this->sch_model->mantee_by_key($row['user_key']);
                $name=json_decode($user['profile'],true);
                $row['name']=$name['name'];
                $row['image'] = base_url() . 'uploads/' . $user['profile_img'];
                array_push($response, $row);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/allNotificationCount  */
    function allNotificationCount_post()
    {
        $data['admin_key']= $this->post('admin_key');

        $res  =$this->sch_model->all_notification_of_user_count($data);

        if ($res) {

            $this->response($res, 200);
        }
        else{
            $this->response('0', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/addNotification  */
    function deleteNotification_post()
    {
        $id= $this->post('id');

        $res = $this->sch_model->delete_notification($id);
        if ($res) {
            $this->response('deleted successfully', 200);
        }
        else{
            $this->response('Unable to add', 200);
        }
    }

    /*##############################*******************************************************************############################*/
    /* ADMIN  */
    /*##############################*******************************************************************############################*/
    /* http://localhost/mentorbaba/v1/adminAllInterestArea  */
    function adminAllInterestArea_get()
    {

        $res = $this->sch_model->all_intrestarea();
        if ($res) {
            $this->response($res, 200);
        }
        else{
            $this->response('Unable to add', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/adminAddInterestArea  */
    function adminAddInterestArea_post()
    {
        $data['id']= $this->post('id');
        $data['name']= $this->post('name');
        if($data['id']){
            $update = $this->sch_model->update_intrestarea($data);
            if($update){    $this->response('Updated Successfully', 200);}
            else{$this->response('Unable to Update', 200);}

        }else {
            $add =  $this->sch_model->add_intrestarea($data);
            if($add){    $this->response('Added Successfully', 200);}
            else{$this->response('Unable to Add', 200);}
        }

    }
//    ===============================================================================================
    /* http://localhost/mentorbaba/v1/adminAllStartupArea  */
    function adminAllStartupArea_get()
    {

        $res = $this->sch_model->all_startuparea();
        if ($res) {
            $this->response($res, 200);
        }
        else{
            $this->response('Unable to add', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/adminAddInterestArea  */
    function adminAddStartupArea_post()
    {
        $data['id']= $this->post('id');
        $data['name']= $this->post('name');
        if($data['id']){
            $update = $this->sch_model->update_startuparea($data);
            if($update){    $this->response('Updated Successfully', 200);}
            else{$this->response('Unable to Update', 200);}

        }else {
            $add =  $this->sch_model->add_startuparea($data);
            if($add){    $this->response('Added Successfully', 200);}
            else{$this->response('Unable to Add', 200);}
        }

    }
    //    ===============================================================================================
    /* http://localhost/mentorbaba/v1/adminAllEduDropDown  */
    function adminAllEduDropDown_get()
    {

        $res = $this->sch_model->all_edu_dropdown();
        if ($res) {
            $this->response($res, 200);
        }
        else{
            $this->response('Unable to add', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/adminAddEduDropDown */
    function adminAddEduDropDown_post()
    {
        $data['id']= $this->post('id');
        $data['name']= $this->post('name');
        if($data['id']){
            $update = $this->sch_model->update_edu_dropdown($data);
            if($update){    $this->response('Updated Successfully', 200);}
            else{$this->response('Unable to Update', 200);}

        }else {
            $add =  $this->sch_model->add_edu_dropdown($data);
            if($add){    $this->response('Added Successfully', 200);}
            else{$this->response('Unable to Add', 200);}
        }

    }
    //    ===============================================================================================
    /* http://localhost/mentorbaba/v1/adminAllEduDropDown  */
    function adminAllExpDropDown_get()
    {

        $res = $this->sch_model->all_exp_dropdown();
        if ($res) {
            $this->response($res, 200);
        }
        else{
            $this->response('Unable to add', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/adminAddEduDropDown */
    function adminAddExpDropDown_post()
    {
        $data['id']= $this->post('id');
        $data['name']= $this->post('name');
        if($data['id']){
            $update = $this->sch_model->update_exp_dropdown($data);
            if($update){    $this->response('Updated Successfully', 200);}
            else{$this->response('Unable to Update', 200);}

        }else {
            $add =  $this->sch_model->add_exp_dropdown($data);
            if($add){    $this->response('Added Successfully', 200);}
            else{$this->response('Unable to Add', 200);}
        }

    }
    //    ===============================================================================================
    /* http://localhost/mentorbaba/v1/adminAllUser  */
    function adminAllUser_get()
    {

        $res = $this->sch_model->all_mantee_for_admin();
        $response=array();
        if ($res) {
            foreach ($res as $row)
            {
                $profile=json_decode($row['profile'],true);
                unset($row['profile']);
                $row['name']=$profile['name'];
                $row['image'] = base_url() . 'uploads/' . $row['profile_img'];
                array_push($response,$row);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('Unable to add', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/adminAllInterestArea  */
    function adminAllProjectFocus_get()
    {

        $res = $this->sch_model->all_projects_focus();
        if ($res) {

            $this->response($res, 200);
        }
        else{
            $this->response('Unable to add', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/adminAddInterestArea  */
    function adminAddProjectFocus_post()
    {
        $data['id']= $this->post('id');
        $data['name']= $this->post('name');
        if($data['id']){
            $update = $this->sch_model->update_projects_focus($data);
            if($update){    $this->response('Updated Successfully', 200);}
            else{$this->response('Unable to Update', 200);}

        }else {
            $add =  $this->sch_model->add_projects_focus($data);
            if($add){    $this->response('Added Successfully', 200);}
            else{$this->response('Unable to Add', 200);}
        }

    }
//    ===============================================================================================
    /* http://localhost/mentorbaba/v1/adminAllProject  */
    function adminAllProject_post()
    {
        $key= $this->post('user_key');
        if($key){
            $projects = $this->sch_model->projects_by_user_key($key);
        }else {
            $projects = $this->sch_model->all_projects();
        }
        $response=array();
        if ($projects) {
            foreach ($projects as $row){
                $temp=array();
                $temp['proj_id'] = $row['id'];
                $temp['id'] = $row['pro_key'];
                $temp['user_key'] = $row['user_key'];
                $temp['status'] = $row['status'];
                $temp['image'] = base_url() . 'uploads/' . $row['image'];
                $temp['submited'] = $row['submited'];
                $temp['projName'] = $row['projName'];
                $temp['babastart'] = $this->sch_model->babastart_exist_by_project_key($row['pro_key']);
                $temp['problum'] = substr($row['problum'],0,200);
                array_push($response, $temp);
            }
            $this->response($response, 200);
        }
        else{
            $this->response($key, 200);
        }

        /*...............................................*/
    }
    /* http://localhost/mentorbaba/v1/adminAddInterestArea  */
    function adminAddProjectApproval_post()
    {
        $data['id']= $this->post('id');
        $status= $data['status']= $this->post('status');
        if($data['id'] && $data['status'] ){
            $proj = $this->sch_model->projects_by_id($data['id']);
            //    =========================notification=============================
            $user_key= $data2['admin_key']=$proj['user_key'];
            $data2['user_key']=$this->sch_model->admin_key();
            $data2['message']= 'has '.$data['status'].' your project';
            $data2['link']= 'mentee/project-detail/'.$proj['pro_key'];;
            $res = $this->sch_model->add_notification($data2);
//        ==================================================================
            $update = $this->sch_model->update_project_status($data);
            if($update){
                $x= $this->sch_model->mantee_by_key($user_key);
                $email=$x['email'];$username=$x['username'];
                // --------------------------------------------------------------------------------------------
                $config['charset'] = 'utf-8';
                $config['mailtype'] = 'html';
                $this->email->initialize($config);
                $this->email->from('info@mentorbaba.co', 'mentorBaba');
                $this->email->to($email);
                if($status=='approved'){ $this->email->subject('Project accepted');
                    $message='<html>
			<head>
			<title>Page Title</title>
			</head>
			<body>
			<div style="border:10px solid #1f3291">
			<img style="width:200px;margin:20px" src="https://mentorbaba.co/img/logo.png" >
            <p style="font-size: 20px;margin-left:20px;">Dear '.$username.',</p>
			<p style="font-size: 20px;margin-left:20px;" >First of all we would like to thank you for giving you time submitting a pitch deck to #PITCHIT @ mentorBaba. However, we regret to inform you that your pitch was not able to make it to mentorBaba. 
We have sent some comments on why your pitch is not selected, you can check them under #PITCHIT Tab under your mentorBaba dashboard. We would love to hear from you again once the corrections are done :-).</p>
            <br>
     
     	    <p style="text-align: right;font-size: 20px;margin-right:20px;" >Thank You</p>
            <p style="text-align: right;font-size: 20px;margin-right:20px;" >Regards</p>
			<p style="text-align: right;font-size: 25px;margin-right:20px;color:#1f3291" >mentorBaba team</p>
			</div>
			</body>
			</html>';
                }else{ $this->email->subject('Project not accepted');
                    $message='<html>
			<head>
			<title>Page Title</title>
			</head>
			<body>
			<div style="border:10px solid #1f3291">
			<img style="width:200px;margin:20px" src="https://mentorbaba.co/img/logo.png" >
            <p style="font-size: 20px;margin-left:20px;">Dear '.$username.',</p>
			<p style="font-size: 20px;margin-left:20px;" >Congratulations! Your application to #PITCHIT has been accepted :-). You can now book appointments with world class mentors and fellow entrepreneurs on mentorBaba and post content on our exclusive community area.
Click on this button to proceed to mentorBaba.</p>
            <br>
     
     	    <p style="text-align: right;font-size: 20px;margin-right:20px;" >Thank You</p>
            <p style="text-align: right;font-size: 20px;margin-right:20px;" >Regards</p>
			<p style="text-align: right;font-size: 25px;margin-right:20px;color:#1f3291" >mentorBaba team</p>
			</div>
			</body>
			</html>';
                }
                $this->email->message($message);
                $this->email->send();

                // --------------------------------------------------------------------------------------------


                $this->response('Updated Successfully', 200);}
            else{$this->response('Unable to Update', 200);}

        }

    }
//    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    /* http://localhost/mentorbaba/v1/adminAllInterestArea  */
    function adminAllHelpArea_get()
    {

        $res = $this->sch_model->all_help_area();
        if ($res) {
            $this->response($res, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/adminAllInterestArea  */
    function allSubHelpAreaByHelpAreaKey_post()
    {
        $key= $this->post('help_key');
        $res = $this->sch_model->all_help_sub_area_by_help_key($key);
        if ($res) {
            $this->response($res, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/adminAddInterestArea  */
    function adminAddHelpArea_post()
    {
        $data['id']= $this->post('id');
        $data['name']= $this->post('name');
        $data['image']= $this->post('image');
        if($data['id']){
            $update = $this->sch_model->update_help_area($data);
            if($update){    $this->response('Updated Successfully', 200);}
            else{$this->response('Unable to Update', 200);}

        }else {
            $add =  $this->sch_model->add_help_area($data);
            if($add){    $this->response('Added Successfully', 200);}
            else{$this->response('Unable to Add', 200);}
        }

    }
    /* http://localhost/mentorbaba/v1/adminAllInterestArea  */
    function adminAllSubHelpArea_get()
    {

        $res = $this->sch_model->all_help_sub_area();
        $response=array();
        if ($res) {
            foreach ($res as $row){

                $row['help_name'] =  $this->sch_model->help_name_by_help_key($row['help_key']);

                array_push($response, $row);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/adminAddInterestArea  */
    function adminAddSubHelpArea_post()
    {
        $data['id']= $this->post('id');
        $data['name']= $this->post('name');
        $data['help_key']= $this->post('help_key');
        if($data['id']==''){
            $add =  $this->sch_model->add_help_sub_area($data);
            if($add){    $this->response('Added Successfully', 200);}
            else{$this->response('Unable to Add', 200);}
        }else {
            $update = $this->sch_model->update_help_sub_area($data);
            if($update){    $this->response('Updated Successfully', 200);}
            else{$this->response('Unable to Update', 200);}
        }

    }
//    -----------------------------------------------------------------------

    /*http://localhost/mentorbaba/v1/allHelpArea           */
    function allHelpArea_get()
    {
        $all_help = $this->sch_model->all_help_area();
        if ($all_help) {
            $this->response($all_help, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /*=====================================================================================*/
    /*                           ADMIN  DESKTOP ITEM*/
    /*=====================================================================================*/
    /*http://localhost/mentorbaba/v1/adminHelpAreaCount           */
    function adminBabaStartCount_get()
    {
        $x = $this->sch_model->all_babastart_count();
        if ($x) {$this->response($x, 200); }
        else{ $this->response(0, 200); }
    }
    /*http://localhost/mentorbaba/v1/adminHelpAreaCount           */
    function adminSubscriberCount_get()
    {
        $x = $this->sch_model->all_subcriber_count();
        if ($x) {$this->response($x, 200); }
        else{ $this->response(0, 200); }
    }
    /*http://localhost/mentorbaba/v1/adminHelpAreaCount           */
    function adminHelpAreaCount_get()
    {
        $x = $this->sch_model->all_help_area_count();
        if ($x) {$this->response($x, 200); }
        else{ $this->response(0, 200); }
    }
    /*http://localhost/mentorbaba/v1/adminIntrestAreaCount           */
    function adminIntrestAreaCount_get()
    {
        $x = $this->sch_model->all_intrestarea_count();
        if ($x) {$this->response($x, 200); }
        else{ $this->response(0, 200); }
    }
    function adminUserCount_get()
    {
        $x = $this->sch_model->all_user_count();
        if ($x) {$this->response($x, 200); }
        else{ $this->response(0, 200); }
    }
    function adminMentorCount_get()
    {
        $x = $this->sch_model->mentor_count();
        if ($x) {$this->response($x, 200); }
        else{ $this->response(0, 200); }
    }
    /*http://localhost/mentorbaba/v1/adminMenteeCount           */
    function adminMenteeCount_get()
    {
        $x = $this->sch_model->mentee_count();
        if ($x) {$this->response($x, 200); }
        else{ $this->response(0, 200); }
    }
//    =====================================
    function adminProjectsCount_get()
    {
        $x = $this->sch_model->all_projects_count();
        if ($x) {$this->response($x, 200); }
        else{ $this->response(0, 200); }
    }
    function adminApprovedProjectsCount_get()
    {
        $x = $this->sch_model->approved_projects_count();
        if ($x) {$this->response($x, 200); }
        else{ $this->response(0, 200); }
    }
    function adminPendingProjectsCount_get()
    {
        $x = $this->sch_model->pending_projects_count();
        if ($x) {$this->response($x, 200); }
        else{ $this->response('0', 200); }
    }
    /*http://localhost/mentorbaba/v1/adminRejectedProjectsCount           */
    function adminRejectedProjectsCount_get()
    {
        $x = $this->sch_model->rejected_projects_count();
        if ($x) {$this->response($x, 200); }
        else{ $this->response(0, 200); }
    }
    /* http://localhost/mentorbaba/v1/allMeetingAdminDashboard   */
    function allMeetingAdminDashboard_get()
    {

        $meeting = $this->sch_model->all_meeting_for_admin();
        $response=array();
        if ($meeting) {
            foreach ($meeting as $row)
            {   $temp=array();
                $admin=$this->sch_model->mantee_by_key($row['admin_key']);
                $user=$this->sch_model->mantee_by_key($row['user_key']);
                $admin_profile=json_decode($admin['profile'],true);
                $user_profile=json_decode($user['profile'],true);
                $temp['user_key']=$row['user_key'];
                $temp['user_name']=$user_profile['name'];
                $temp['user_image']=base_url() . 'uploads/' . $user['profile_img'];
                $temp['admin_key']=$row['admin_key'];
                $temp['admin_name']=$admin_profile['name'];
                $temp['admin_image']=base_url() . 'uploads/' . $admin['profile_img'];
                $temp['start_time']=$row['start_time'];
                $temp['end_time']=$row['end_time'];
                $temp['status_flag']=$row['status'];
                $status=$row['status'];
                if($status==1){$temp['status']='Pending';}
                if($status==2){$temp['status']='Accepted';}
                array_push($response,$temp);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /* http://localhost/mentorbaba/v1/allMeetingAdminDashboard   */
    function allMeetingAdminDashboardToday_get()
    {

        $meeting = $this->sch_model->all_meeting_for_admin_today();
        $response=array();
        if ($meeting) {
            foreach ($meeting as $row)
            {   $temp=array();
                $admin=$this->sch_model->mantee_by_key($row['admin_key']);
                $user=$this->sch_model->mantee_by_key($row['user_key']);
                $admin_profile=json_decode($admin['profile'],true);
                $user_profile=json_decode($user['profile'],true);
                $temp['user_key']=$row['user_key'];
                $temp['user_name']=$user_profile['name'];
                $temp['user_image']=base_url() . 'uploads/' . $user['profile_img'];
                $temp['admin_key']=$row['admin_key'];
                $temp['admin_name']=$admin_profile['name'];
                $temp['admin_image']=base_url() . 'uploads/' . $admin['profile_img'];
                $temp['start_time']=$row['start_time'];
                $temp['end_time']=$row['end_time'];
                $temp['status_flag']=$row['status'];
                $status=$row['status'];
                if($status==1){$temp['status']='Pending';}
                if($status==2){$temp['status']='Accepted';}
                array_push($response,$temp);
            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
//    http://localhost/mentorbaba/v1/todayAllMeetingCount
    function todayAllMeetingCount_post()
    {    $key=$this->post('user_key');
        $x = $this->sch_model->all_meeting_of_user_today_count($key);
        $y= $this->sch_model->all_meeting_of_admin_today_count($key);
        $z=$x + $y;
        if ($z) {$this->response($z, 200); }
        else{ $this->response('0', 200); }
    }
    /*##########################################################*/
    /*  PROJECT   ALLOW TO VIEW */
    /*##########################################################*/
    function addProjectRequestToView_post()
    {
        $data['project_key']=$this->post('project_key');
        $data['proj_owner_key']=$this->post('proj_owner_key');
        $data['req_key']=$this->post('req_key');
        $data['request']=$this->post('request');
        $add = $this->sch_model->add_peoject_view_request($data);
        if($add){
            //    =========================notification=============================
            $data2['admin_key']=$data['proj_owner_key'];
            $data2['user_key']=$data['req_key'];
            $data2['message']= 'has requested for view project';
            $data2['link']= 'mentee/project-detail/'.$data['project_key'];
            $res = $this->sch_model->add_notification($data2);
//        ==================================================================
            $this->response('Added Successfully', 200);
        }
        else{$this->response('Unable to Add', 200);}
    }
    function listViewOfProjectByProjectKey_post()
    {
        $pro_key=$this->post('pro_key');
        $res = $this->sch_model->all_peoject_view_request_by_project_key($pro_key);
        if ($res) {
            $temp= array();
            foreach ($res as $row){
                $user = $this->sch_model->mantee_by_key($row['req_key']);
                $profile=json_decode($user['profile'],true);
                unset($user['profile']);
                $row['name']=$profile['name'];
                $row['image'] = base_url() . 'uploads/' . $user['profile_img'];
                array_push($temp,$row);
            }
            $this->response($temp, 200);
        }
        else{ $this->response('0', 202); }
    }
    function updateViewOfProject_post()
    {

        $project_key=$this->post('project_key');
        $admin_key=$this->post('admin_key');
        $user_key=$this->post('user_key');
        $data['id']=$this->post('id');
        $data['status']=$this->post('status');
        $res = $this->sch_model->update_peoject_view_request($data);
        if ($res) {
            //    =========================notification=============================
            $data2['admin_key']=$user_key;
            $data2['user_key']=$admin_key;
            $data2['message']= 'has permited to view project';
            $data2['link']= 'mentee/project-detail/'.$project_key;
            $res = $this->sch_model->add_notification($data2);
//        ==================================================================
            $this->response('Allowed successfully', 200);
        }
        else{ $this->response('Something went wrong', 200); }

    }
    /*##########################################################*/
    /*  Subscriber */
    /*##########################################################*/
    //    http://localhost/mentorbaba/v1/todayAllMeetingCount
    function addSubscriber_post()
    {    $data['email']=$this->post('email');
        $x = $this->sch_model->add_subscriber($data);
        if ($x) {$this->response('Thanks for subscribing us .', 200); }
        else{ $this->response('Something went wrong', 200); }
    }
    function allSubscriber_get()
    {
        $x = $this->sch_model->all_subcriber();
        if ($x) {$this->response($x, 200); }
        else{ $this->response('', 200); }
    }
    /*##########################################################*/
    /* babaStart*/
    /*##########################################################*/
    function addBabaStart_post()
    {
        $data=$this->post('data');
        unset($data['term']);
        $data['project_key']=$this->post('project_key');
        $x = $this->sch_model->add_babastart($data);
        if ($x) {$this->response('submitted successfully .', 200); }
        else{ $this->response('Something went wrong', 200); }
    }
    function allBabaStart_get()
    {
        $x = $this->sch_model->all_babastart();
        if ($x) {$this->response($x, 200); }
        else{ $this->response('', 200); }
    }
    function babaStartByProjectKey_post()
    {
        $pro_key=$this->post('project_key');
        $x = $this->sch_model->babastart_by_project_key($pro_key);
        if ($x) {$this->response($x , 200); }
        else{ $this->response('', 200); }
    }

}

