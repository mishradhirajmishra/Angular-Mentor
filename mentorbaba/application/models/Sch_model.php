<?php
class Sch_model extends CI_Model
{
    public function __construct()
    { $this->load->database();  }
    /*##########################################################*/
    /* OTHER  */
    /*##########################################################*/


    function update_jwt($data){
        $this->db->where('id',$data['id']);
        unset($data['id']);
        $this->db->update('mantee', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function verify_jwt($data){
        return $this->db->get_where('mantee', $data)->row_array();
    }
    function add_contact($data){
        $this->db->insert('contact', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function all_contact(){
        return  $this->db->get('contact')->result_array();
    }
    /*##########################################################*/
    /* MANTEE */
    /*##########################################################*/
    function add_mantee($data){
        $data['unique_key']= md5(rand());
        $data['my_code']= md5(rand());
        $data['date']= date('Y-m-d');
        $data['password']= md5($data['password']);
        $this->db->insert('mantee', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function update_account($data ,$key){
        $this->db->where('unique_key',$key);
        if($data['password']=='') {unset($data['password']);}else{$data['password']=md5($data['password']);}
        unset($data['cpassword']);
        $this->db->update('mantee', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }

    function update_mantee($data){
        $this->db->where('id',$data['id']);
        unset($data['id']);
        $result = $this->db->update('mantee', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function  update_mantee_profile($data,$user_key){
        $this->db->where('unique_key',$user_key);
        $temp=json_encode($data);
        $data1=array('profile'=>$temp);
        $this->db->update('mantee', $data1);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function  update_mantee_profile_image($data,$user_key){
        $this->db->where('unique_key',$user_key);
        $data1=array('profile_img'=>$data);
        $this->db->update('mantee', $data1);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function  update_project_image($data,$pro_key){
        $this->db->where('pro_key',$pro_key);
        $data1=array('image'=>$data);
        $this->db->update('projects', $data1);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function  update_mantee_intrest_area($data,$user_key){
        $this->db->where('unique_key',$user_key);
        $data1=array('intrest_area'=>json_encode($data));
        $this->db->update('mantee', $data1);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function account_by_unique_Key($key){
        $this->db->select('username');
        $this->db->select('email');
        $this->db->select('skype_id');
        $this->db->select('my_code');
        $data = array('unique_key' => $key);
        $x=$this->db->get_where('mantee', $data)->row_array();
        return $x;
    }
    function  mantee_by_key($key){
        $data = array('unique_key' => $key);
        $x=$this->db->get_where('mantee', $data)->row_array();
        return $x;
    }
    function  admin_key(){
        $data = array('role' => 'admin');
        $x=$this->db->get_where('mantee', $data)->row_array();
        return $x['unique_key'];
    }

    function  mantee_profile_by_key($key){
        $data = array('unique_key' => $key);
        $x=$this->db->get_where('mantee', $data)->row_array();
        return$x['profile'];
    }
    function  mantee_role_by_key($key){
        $data = array('unique_key' => $key);
        $x=$this->db->get_where('mantee', $data)->row_array();
        return$x['role'];
    }
    function  proj_image_by_key($pro_key ){
        $data = array('pro_key' => $pro_key);
        $x=$this->db->get_where('projects', $data)->row_array();
        return$x['image'];
    }
    function  mantee_profile_image_by_key($key){
        $data = array('unique_key' => $key);
        $x=$this->db->get_where('mantee', $data)->row_array();
        return $x['profile_img'];
    }
    function  mantee__intrest_area_key($user_key){
        $data = array('unique_key' =>$user_key);
        $x=$this->db->get_where('mantee', $data)->row_array();
        return $x['intrest_area'];
    }
    function  mantee_email_by_key($user_key){
        $data = array('unique_key' =>$user_key);
        $x=$this->db->get_where('mantee', $data)->row_array();
        return $x['email'];
    }
    function  mantee_by_id($id){
        $data = array('id' => $id);
        return $this->db->get_where('mantee', $data)->row_array();
    }
    function all_mantee(){
        $this->db->order_by('id', 'DESC');
        return  $this->db->get('mantee')->result_array();
    }
    function all_mantee_for_admin(){
        $this->db->order_by('id', 'DESC');
        $this->db->select('id');
        $this->db->select('username');
        $this->db->select('unique_key');
        $this->db->select('role');
        $this->db->select('profile');
        $this->db->select('profile_img');
        return  $this->db->get('mantee')->result_array();
    }
    function all_mantee_except_me($key){
        $this->db->where('unique_key !=',$key);
        return  $this->db->get('mantee')->result_array();
    }
    function all_mentor($key){
        $this->db->where('role=','mentor');
        return  $this->db->get('mantee')->result_array();
    }
    function all_mantee_count(){
        return  $this->db->get('mantee')->num_rows();
    }
    function  chk_mantee_exist($username){
        $data = array('username' => $username);
        $query = $this->db->get_where('mantee', $data)->num_rows();
        return $query;
    }
    function  chk_code_exist($data){
        $query = $this->db->get_where('mantee', $data)->num_rows();
        return $query;
    }
    function  chk_mantee_email_exist($email){
        $data = array('email' => $email);
        $query = $this->db->get_where('mantee', $data)->num_rows();
        return $query;
    }
    function  validate_user_email($email){
        $data = array('email' => $email);
        $query = $this->db->get_where('mantee', $data)->row_array();
        return $query['username'];
    }
    function  reset_mantee_password($pass,$email){
        $this->db->where('email',$email);
        $data['password']=md5($pass);
        $this->db->update('mantee', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function my_follower($key){
        $data['admin_key']=$key;
        $x = $this->sch_model->all_follow_of_user($data);
        $this->db->where_in('unique_key',$x);
        return  $this->db->get('mantee')->result_array();
    }
    function search_user($key){
        $this->db->like('username',$key);
        return  $this->db->get('mantee')->result_array();
    }
    function  mentee_count(){
        $data = array('role' => 'mentee');
        $x=$this->db->get_where('mantee', $data)->num_rows();
        return $x;
    }
    function  mentor_count(){
        $data = array('role' => 'mentor');
        $x=$this->db->get_where('mantee', $data)->num_rows();
        return $x;
    }
    function  all_user_count(){
        $x=$this->db->get('mantee')->num_rows();
        return $x -1;
    }

    /*##########################################################*/
    /* STARTUP AREA */
    /*##########################################################*/
    function all_startuparea(){
        $this->db->order_by('id', 'DESC');
        return  $this->db->get('startuparea')->result_array();
    }
    function  startuparea_by_id($id){
        $data = array('id' => $id);
        return $this->db->get_where('startuparea', $data)->row_array();
    }
    function add_startuparea($data){
        unset($data['id']);
        $this->db->insert('startuparea', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function update_startuparea($data){
        $this->db->where('id',$data['id']);
        unset($data['id']);
        $this->db->update('startuparea', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    /*##########################################################*/
    /* Interest  AREA */
    /*##########################################################*/
    function all_intrestarea(){
        $this->db->order_by('id', 'DESC');
        return  $this->db->get('intrestarea')->result_array();
    }
    function all_intrestarea_count(){
        $this->db->order_by('id', 'DESC');
        return  $this->db->get('intrestarea')->num_rows();
    }
    function  intrestarea_by_id($id){
        $data = array('id' => $id);
        return $this->db->get_where('intrestarea', $data)->row_array();
    }
    function  intrestarea_name_by_id($id){
        $data = array('id' => $id);
        $x= $this->db->get_where('intrestarea', $data)->row_array();
        return $x['name'];
    }
    function add_intrestarea($data){
        unset($data['id']);
        $this->db->insert('intrestarea', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function update_intrestarea($data){
        $this->db->where('id',$data['id']);
        unset($data['id']);
        $this->db->update('intrestarea', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }

    /*##########################################################*/
    /* PROJECT FOCUS AREA */
    /*##########################################################*/
    function all_projects_focus(){
        return  $this->db->get('projects_focus')->result_array();
    }
    function  projects_focus_by_id($id){
        $data = array('id' => $id);
        return $this->db->get_where('projects_focus', $data)->row_array();
    }
    function add_projects_focus($data){
        unset($data['id']);
        $this->db->insert('projects_focus', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function update_projects_focus($data){
        $this->db->where('id',$data['id']);
        unset($data['id']);
        $this->db->update('projects_focus', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    /*##########################################################*/
    /* mantee profile */
    /*##########################################################*/

    function all_exp_dropdown(){
        $this->db->order_by('id', 'DESC');
        return  $this->db->get('exp_dropdown')->result_array();
    }
    function  exp_dropdown_by_id($id){
        $data = array('id' => $id);
        return $this->db->get_where('exp_dropdown', $data)->row_array();
    }
    function all_edu_dropdown(){
        $this->db->order_by('id', 'DESC');
        return  $this->db->get('edu_dropdown')->result_array();
    }
    function  edu_dropdown_by_id($id){
        $data = array('id' => $id);
        return $this->db->get_where('edu_dropdown', $data)->row_array();
    }
    function add_edu_dropdown($data){
        unset($data['id']);
        $this->db->insert('edu_dropdown', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function update_edu_dropdown($data){
        $this->db->where('id',$data['id']);
        unset($data['id']);
        $this->db->update('edu_dropdown', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function add_exp_dropdown($data){
        unset($data['id']);
        $this->db->insert('exp_dropdown', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function update_exp_dropdown($data){
        $this->db->where('id',$data['id']);
        unset($data['id']);
        $this->db->update('exp_dropdown', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }





    /*##########################################################*/
    /*LOGIN*/
    /*##########################################################*/
    function login($data){
        unset($data['type']);
        $query = $this->db->get_where('mantee',$data)->row_array();
        return $query;
    }
    function change_login_status_true($id){
        $data=array('login_status'=>1);
        $this->db->where('id',$id);
        $this->db->update('mantee', $data);

    }
    function logout($unique_key){
        $data=array('login_status'=>0);
        $this->db->where('unique_key',$unique_key);
        $this->db->update('mantee', $data);
    }

    function login_status_individual($unique_key){
        $data=array('unique_key'=>$unique_key);
        $query = $this->db->get_where('mantee',$data)->row_array();
        return $query['login_status'];
    }
    /*##########################################################*/
    /* PROJECTS */
    /*##########################################################*/
    function add_project($user_key,$data){
        $data['user_key']=$user_key;
        $data['pro_key']= md5(rand());
        $data['date']=date('Y/m/d');
        $data['month']=date('m');
        $data['year']=date('Y');
        $this->db->insert('projects', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function update_project($pro_key,$data){

        $this->db->where('pro_key',$pro_key);
        $this->db->update('projects', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function  all_projects(){
        $this->db->order_by('id', 'DESC');
        $x=$this->db->get('projects')->result_array();
        return $x;
    }
    function  all_projects_count(){
        $x=$this->db->get('projects')->num_rows();
        return $x;
    }
    function  approved_projects_count(){
        $data = array('status' =>'approved');
        $x=$this->db->get_where('projects',$data)->num_rows();
        return $x;
    }
    function  pending_projects_count(){
        $data = array('status' =>'pending');
        $x=$this->db->get_where('projects',$data)->num_rows();
        return $x;
    }
    function  rejected_projects_count(){
        $data = array('status' =>'rejected');
        $x=$this->db->get_where('projects',$data)->num_rows();
        return $x;
    }
    function  projects_by_user_key($key){
        $this->db->order_by('id', 'DESC');
        $data = array('user_key' => $key);
        $x=$this->db->get_where('projects', $data)->result_array();
        return $x;
    }
    function  approved_projects_by_user_key($key){
        $data = array('user_key' => $key,'status'=>'approved');
        $x=$this->db->get_where('projects', $data)->result_array();
        return $x;
    }

    function  appproved_projects_by_user_key($key){
        $data = array('user_key' => $key,'status'=>'approved');
        $x=$this->db->get_where('projects', $data)->result_array();
        return $x;
    }
    function  projects_by_pro_key($key){
        $data = array('pro_key' => $key);
        $x=$this->db->get_where('projects', $data)->row_array();
        return $x;
    }
    function  projects_by_id($id){
        $data = array('id' => $id);
        $x=$this->db->get_where('projects', $data)->row_array();

        return $x;
    }
    function update_project_status($data){
        $this->db->where('id',$data['id']);
        unset($data['id']);
        $this->db->update('projects', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }

    /*##########################################################*/
    /* CHAT CONTACT */
    /*##########################################################*/
    function  add_chat_contact($data){
        $data['room']=md5(rand());
        $x1=$this->sch_model->contact_exist($data);
        if($x1==0){ $this->db->insert('chat_contact', $data);}
        $temp = $data['user_key'];
        $data['user_key']=$data['admin_key'];
        $data['admin_key']=$temp;
        $x2=$this->sch_model->contact_exist($data);
        if($x2==0){ $this->db->insert('chat_contact', $data);}
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function  chat_contact_by_id($id){
        $data = array('id' => $id);
        $x=$this->db->get_where('chat_contact', $data)->row_array();
        return $x;
    }
    function  all_chat_contact_of_admin($data){
        $x=$this->db->get_where('chat_contact', $data)->result_array();
        return $x;
    }
    function contact_exist($data){
        $data = array('admin_key' => $data['admin_key'],'user_key'=>$data['user_key']);
        $x=$this->db->get_where('chat_contact', $data)->num_rows();
        return $x;
    }
    function get_chat_room($data){
        $x=$this->db->get_where('chat_contact', $data)->row_array();
        return $x['room'];
    }
    function  unread_message_individual($data){
        $this->db->where('status',0);
        $x=$this->db->get_where('chat_message', $data)->num_rows();
        return $x;
    }
    function  update_message_status_to_read($data){
        $data1['status']=1;
        $this->db->where($data);
        $this->db->update('chat_message', $data1);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    /*##########################################################*/
    /* CHAT MESSAGE */
    /*##########################################################*/
    function add_chat_message($data){
        $this->db->insert('chat_message', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }

    function all_chat_message($data){
//          $data1=array('admin_key'=>$admin_key,'user_key'=>$user_key);
//          $data2=array('admin_key'=>$user_key,'user_key'=>$admin_key);
//          $this->db->where($data1);
//          $this->db->or_where($data2);
        $x=$this->db->get_where('chat_message',$data)->result_array();
        return $x;
    }
    function delete_chat_message($id){
        $this->db->where('id',$id);
        $this->db->delete('chat_message');
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }

    /*##########################################################*/
    /* MEETING */
    /*##########################################################*/
    function add_meeting($data){
        $this->db->insert('meeting', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function update_meeting($data){
        $this->db->where('id',$data['id']);
        if($data['check']=='noproject'){
            $data['project_key']="";
        }
        unset($data['check']);
        $data['status']=1;
        $this->db->update('meeting', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function reject_meeting_by_admin($data){
        $this->db->where('id',$data['id']);
        $id=$data['id'];
        unset($data['id']);
        $this->db->update('meeting', $data);
        /*===================================*/
        $data1 = array('id' => $id);
        $recected_row=$this->db->get_where('meeting', $data1)->row_array();
        $this->db->insert('rejected_meeting', $recected_row);
        /*===================================*/
        $data3=array('user_key'=>"",'status'=>0,'project_key'=>"",'project_oner_key'=>"",'meeting_comment'=>"",'reject_comment'=>"",'mode'=>"");
        $this->db->where('id',$id);
        $this->db->update('meeting', $data3);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function cancel_meeting_by_user($id){
        $data=array('user_key'=>"",'status'=>0,'project_key'=>"",'project_oner_key'=>"",'meeting_comment'=>"",'reject_comment'=>"",'mode'=>"");
        $this->db->where('id',$id);
        $this->db->update('meeting', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function accept_meeting_by_admin($key){
        $this->db->where('id',$key);
        $data['status']=2;
        $this->db->update('meeting', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function  all_meeting_of_admin($key){
        $this->db->order_by("start_time", "asc");
        $this->db->where('start_time>=', date('Y-m-d'));
        $data = array('admin_key' => $key);
        $x=$this->db->get_where('meeting', $data)->result_array();
        return $x;
    }
    function  all_meeting_for_admin(){
        $this->db->order_by("start_time", "asc");
        $this->db->where('start_time>=', date('Y-m-d'));
        $this->db->where('user_key!=','');
        $x=$this->db->get_where('meeting')->result_array();
        return $x;
    }
    function  all_meeting_for_admin_today(){
        $this->db->order_by("start_time", "asc");
        $date=date('Y-m-d');
        $this->db->like('start_time', $date, 'after');
        $this->db->where('user_key!=','');
        $x=$this->db->get_where('meeting')->result_array();
        return $x;
    }
    function  all_meeting_of_user_today_count($key){
        $this->db->where('user_key=',$key);
        $this->db->where('status=',2);
        $date=date('Y-m-d');
        $this->db->like('start_time', $date, 'after');
        $x=$this->db->get_where('meeting')->num_rows();
        return $x;
    }
    function  all_meeting_of_admin_today_count($key){
        $this->db->where('admin_key=',$key);
        $this->db->where('status=',2);
        $date=date('Y-m-d');
        $this->db->like('start_time', $date, 'after');
        $x=$this->db->get_where('meeting')->num_rows();
        return $x;
    }

    function  upcomming_meeting($key){
        $this->db->order_by("start_time", "asc");
        $this->db->where('start_time>=', date('Y-m-d'));
        $status = array(1,2);
        $this->db->where_in('status',$status);
        $data = array('user_key' => $key);
        $x=$this->db->get_where('meeting', $data)->result_array();
        return $x;
    }
    function  rejected_meeting($key){
        $this->db->order_by("start_time", "asc");
        $this->db->where('start_time>=', date('Y-m-d'));
        $status = array(1,2);
        $this->db->where_in('status',$status);
        $data = array('user_key' => $key);
        $x=$this->db->get_where('rejected_meeting', $data)->result_array();
        return $x;
    }
    function delete_rejected_meeting($id){
        $this->db->where('id',$id);
        $this->db->delete('rejected_meeting');
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function  manage_meeting($key){
        $this->db->order_by("start_time", "asc");
        $this->db->where('start_time>=', date('Y-m-d'));
        $data = array('admin_key' => $key,'status!='=>0);
        $x=$this->db->get_where('meeting', $data)->result_array();
        return $x;
    }
    function  all_meeting_of_user($key){
        $data = array('user_key' => $key);
        $x=$this->db->get_where('meeting', $data)->result_array();
        return $x;
    }
    function  meeting_by_id($id){
        $data = array('id' => $id);
        $x=$this->db->get_where('meeting', $data)->row_array();
        return $x;
    }
    function deleteMeeting_of_admin($id){
        $this->db->where('id',$id);
        $this->db->delete('meeting');
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    /*##########################################################*/
    /* POSTS */
    /*##########################################################*/
    function add_post($data){
        $this->db->insert('post', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function delete_post($id){
        $this->db->where('id',$id);
        $this->db->delete('post');
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function all_post($limit,$start){
        $this->db->order_by('id', 'DESC');
        $this->db->limit($limit,$start);
        $x=$this->db->get('post')->result_array();
        return $x;
    }
    function all_post_for_dashboard($limit,$start,$key)
    {
        $this->db->where('user_key!=',$key);
        $this->db->order_by('id', 'DESC');
//          $this->db->limit($limit,$start);
        $x=$this->db->get('post')->result_array();
        return $x;
    }
    function mantee_all_post_for_dashboard($limit,$start,$user_key)
    {
        $this->db->order_by('id', 'DESC');
//          $this->db->limit($limit,$start);
        $data=array('user_key' => $user_key);
        $x=$this->db->get_where('post',$data)->result_array();
        return $x;
    }
    function mantee_all_post_for_dashboard_count($user_key)
    {
        $data=array('user_key' => $user_key);
        $x=$this->db->get_where('post',$data)->num_rows();
        return $x;
    }
    function post_user_key($post_key)
    {
        $data=array('post_key' => $post_key);
        $x=$this->db->get_where('post',$data)->row_array();
        return $x['user_key'];
    }
    /*##########################################################*/
    /* FOLLOW */
    /*##########################################################*/
    function add_follow($data){
        $this->db->insert('follow', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function follow_by_id($id){
        $data=array('id',$id);
        $x=$this->db->get_where('follow', $data)->row_array();
        return $x;
    }

    function is_follow($data){
        $x=$this->db->get_where('follow', $data)->num_rows();
        return $x;
    }
    function all_follow_of_user($data){
        $this->db->select('user_key');
        $x=$this->db->get_where('follow', $data)->result_array();
        $y=array();
        foreach ($x as $row){
            $y[]=$row['user_key'];
        }
        return $y;
    }
    function all_follow_of_user_count($data){
        $x=$this->db->get_where('follow', $data)->num_rows();
        return $x;
    }

    /*##########################################################*/
    /* POST LIKE */
    /*##########################################################*/
    function add_post_like($data){
        $this->db->insert('post_like', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function post_like_by_id($id){
        $data=array('id',$id);
        $x=$this->db->get_where('post_like', $data)->row_array();
        return $x;
    }

    function is_post_like($data){
        $x=$this->db->get_where('post_like', $data)->num_rows();
        return $x;
    }
    function all_post_like_count($data){
        $x=$this->db->get_where('post_like', $data)->num_rows();
        return $x;
    }
    /*##########################################################*/
    /* POST COMMENT */
    /*##########################################################*/
    function add_post_comment($data){
        $this->db->insert('post_comment', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function update_post_comment($data){
        $this->db->where('id',$data['id']);
        unset($data['id']);
        $this->db->update('post_comment', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function post_comment_by_id($id){
        $data=array('id',$id);
        $x=$this->db->get_where('post_comment', $data)->row_array();
        return $x;
    }

    function all_post_comment($data){
        $this->db->order_by('id', 'DESC');
        $x=$this->db->get_where('post_comment', $data)->result_array();
        return $x;
    }
    function all_post_comment_count($data){
        $x=$this->db->get_where('post_comment', $data)->num_rows();
        return $x;
    }
    /*##########################################################*/
    /* POST COMMENT REPLY*/
    /*##########################################################*/

    function add_post_comment_reply($data){
        $this->db->insert('post_comment_reply', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function all_post_comment_reply($data){
        $this->db->order_by('id', 'DESC');
        $x=$this->db->get_where('post_comment_reply', $data)->result_array();
        return $x;
    }
    function all_post_comment_reply_count($data){
        $this->db->order_by('id', 'DESC');
        $x=$this->db->get_where('post_comment_reply', $data)->num_rows();
        return $x;
    }

    /*##########################################################*/
    /*  notification*/
    /*##########################################################*/
    function add_notification($data){
        $this->db->insert('notification', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function all_notification_of_user($data){
        $this->db->order_by("id", "desc");
        $x=$this->db->get_where('notification', $data)->result_array();
        return $x;
    }
    function all_notification_of_user_count($data){
        $x=$this->db->get_where('notification', $data)->num_rows();
        return $x;
    }
    function notification_by_id($id){
        $data=array('id',$id);
        $x=$this->db->get_where('notification', $data)->row_array();
        return $x;
    }
    function delete_notification($id){
        $this->db->where('id',$id);
        $this->db->delete('notification');
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function update_notification($data){
        $this->db->where('id',$data['id']);
        unset($data['id']);
        $this->db->update('notification', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    /*##########################################################*/
    /* HELP  AREA */
    /*##########################################################*/
    function all_help_area(){
        $this->db->order_by('id', 'DESC');
        return  $this->db->get('help_area')->result_array();
    }
    function all_help_area_count(){
        return  $this->db->get('help_area')->num_rows();
    }
    function  help_name_by_help_key($key){
        $data = array('help_key' => $key);
        $x= $this->db->get_where('help_area', $data)->row_array();
        return $x['name'];
    }
    function  help_by_help_key($key){
        $data = array('help_key' => $key);
        $x= $this->db->get_where('help_area', $data)->row_array();
        return $x;
    }

    function  help_area_by_id($id){
        $data = array('id' => $id);
        return $this->db->get_where('help_area', $data)->row_array();
    }
    function  help_area_name_by_id($id){
        $data = array('id' => $id);
        $x= $this->db->get_where('help_area', $data)->row_array();
        return $x['name'];
    }
    function add_help_area($data){
        unset($data['id']);
        $data['help_key']=md5(rand());
        $this->db->insert('help_area', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function update_help_area($data){
        $this->db->where('id',$data['id']);
        unset($data['id']);
        $this->db->update('help_area', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    /*##########################################################*/
    /* SUB HELP  AREA */
    /*##########################################################*/
    function all_help_sub_area(){
        $this->db->order_by('id', 'DESC');
        return  $this->db->get('help_sub_area')->result_array();
    }
    function all_help_sub_area_by_help_key($key){
        $data = array('help_key' =>$key);
        return  $this->db->get_where('help_sub_area',$data)->result_array();
    }
    function all_help_sub_area_for_mentor(){
        $this->db->order_by('help_key', 'DESC');
        return  $this->db->get('help_sub_area')->result_array();
    }
    function  mentee_help_area_key($user_key){
        $data = array('unique_key' =>$user_key);
        $x=$this->db->get_where('mantee', $data)->row_array();
        return $x['help_area'];
    }
    function  help_sub_area_by_id($id){
        $data = array('id' => $id);
        return $this->db->get_where('help_sub_area', $data)->row_array();
    }
    function  help_sub_area_name_by_id($id){
        $data = array('id' => $id);
        $x= $this->db->get_where('help_sub_area', $data)->row_array();
        return $x['name'];
    }
    function add_help_sub_area($data){
        unset($data['id']);
        $data['help_sub_key']=md5(rand());
        $this->db->insert('help_sub_area', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function update_help_sub_area($data){
        $this->db->where('id',$data['id']);
        unset($data['id']);
        $this->db->update('help_sub_area', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function  update_mentee_help_sub_area_area($data,$user_key){
        $this->db->where('unique_key',$user_key);
        $data1=array('help_area'=>json_encode($data));
        $this->db->update('mantee', $data1);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
//    =====================================
    /*##########################################################*/
    /*  PROJECT   ALLOW TO VIEW */
    /*##########################################################*/

    function add_peoject_view_request($data){
        $this->db->insert('project_view_allow', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function update_peoject_view_request($data){
        $this->db->where('id',$data['id']);
        unset($data['id']);
        $this->db->update('project_view_allow', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function all_peoject_view_request_of_owner($owner_key){
        $this->db->where('proj_owner_key',$owner_key);
        return  $this->db->get('project_view_allow')->result_array();
    }
    function check_peoject_view_request_status($data){
        return $this->db->get_where('project_view_allow', $data)->row_array();

    }
    function all_peoject_view_request_by_project_key($pro_key){
        $this->db->where('project_key',$pro_key);
        return  $this->db->get('project_view_allow')->result_array();
    }
    /*##########################################################*/
    /*  Subscriber */
    /*##########################################################*/
    function add_subscriber($data){
        $this->db->insert('subcriber', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function all_subcriber(){
        return  $this->db->get('subcriber')->result_array();
    }
    function all_subcriber_count(){
        return  $this->db->get('subcriber')->num_rows();
    }
    /*##########################################################*/
    /* babaStart*/
    /*##########################################################*/
    function add_babastart($data){
        $this->db->insert('babastart', $data);
        if ($this->db->affected_rows()) { return 1;} else { return 0; }
    }
    function all_babastart(){
        return  $this->db->get('babastart')->result_array();
    }
    function all_babastart_count(){
        return  $this->db->get('babastart')->num_rows();
    }
    function babastart_by_project_key($pro_key){
        $this->db->where('project_key',$pro_key);
        return  $this->db->get('babastart')->row_array();
    }

    function babastart_exist_by_project_key($pro_key){
        $this->db->where('project_key',$pro_key);
        return  $this->db->get('babastart')->num_rows();
    }





























}