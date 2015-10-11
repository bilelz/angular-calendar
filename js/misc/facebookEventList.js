http://findmyfacebookid.com/
https://developers.facebook.com/docs/reference/fql/event/


SELECT eid, name, location, start_time, end_time,  description, privacy, ticket_uri, timezone, pic_cover FROM event WHERE eid 
in ( select eid from event_member where uid =  7724542745)   AND start_time >= now()

{
  "data": [
    {
      "eid": "816863158381757",
      "name": "United vs Barcelona",
      "location": "Levi's Stadium",
      "start_time": "2015-07-25T13:00:00-0700",
      "end_time": null,
      "description": "The Reds take on European champions FC Barcelona on Saturday in game three of Tour 2015.",
      "privacy": "OPEN",
      "ticket_uri": null,
      "timezone": "America/Los_Angeles",
      "pic_cover": {
        "cover_id": "10153124708367746",
        "source": "https://scontent.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/11745759_10153124708367746_9161098621056061803_n.png?oh=0fcf2d3f3f72b2994405891f9eca7c69&oe=5652FFE5",
        "offset_y": 0,
        "offset_x": 0
      }
    }
  ]
}