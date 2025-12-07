"""
Reddit OSINT Intelligence Gathering Module
"""

import requests
import time
from typing import Dict, List, Optional
from datetime import datetime
from fake_useragent import UserAgent
import logging

logger = logging.getLogger(__name__)


class RedditOSINT:
    """Reddit intelligence gathering class"""
    
    def __init__(self, rate_limit: float = 2.0, client_id: Optional[str] = None):
        self.rate_limit = rate_limit
        self.ua = UserAgent()
        self.client_id = client_id
        self.base_url = "https://www.reddit.com"
        self.api_url = "https://oauth.reddit.com" if client_id else "https://www.reddit.com"
        self.session = requests.Session()
        self.last_request_time = 0
        
    def _rate_limit_check(self):
        """Enforce rate limiting"""
        current_time = time.time()
        time_since_last = current_time - self.last_request_time
        if time_since_last < self.rate_limit:
            time.sleep(self.rate_limit - time_since_last)
        self.last_request_time = time.time()
    
    def _make_request(self, url: str, headers: Optional[Dict] = None) -> Optional[Dict]:
        """Make HTTP request with rate limiting"""
        self._rate_limit_check()
        
        default_headers = {
            'User-Agent': self.ua.random
        }
        
        if headers:
            default_headers.update(headers)
        
        try:
            response = self.session.get(url, headers=default_headers, timeout=30)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Request failed: {e}")
            return None
    
    def get_user_info(self, username: str) -> Optional[Dict]:
        """Get user profile information"""
        logger.info(f"Gathering Reddit user info for: {username}")
        
        url = f"{self.base_url}/user/{username}/about.json"
        data = self._make_request(url)
        
        if data and 'data' in data:
            return data['data']
        return None
    
    def get_user_posts(self, username: str, limit: int = 25) -> List[Dict]:
        """Get user's recent posts"""
        url = f"{self.base_url}/user/{username}/submitted.json"
        params = {'limit': limit}
        
        data = self._make_request(url, params)
        posts = []
        
        if data and 'data' in data:
            posts = data['data'].get('children', [])
        
        return posts
    
    def get_user_comments(self, username: str, limit: int = 25) -> List[Dict]:
        """Get user's recent comments"""
        url = f"{self.base_url}/user/{username}/comments.json"
        params = {'limit': limit}
        
        data = self._make_request(url, params)
        comments = []
        
        if data and 'data' in data:
            comments = data['data'].get('children', [])
        
        return comments
    
    def analyze_profile(self, username: str) -> Dict:
        """Comprehensive profile analysis"""
        logger.info(f"Analyzing Reddit profile: {username}")
        
        profile_data = {
            'platform': 'reddit',
            'username': username,
            'timestamp': datetime.now().isoformat(),
            'profile_info': None,
            'posts': [],
            'comments': [],
            'analysis': {}
        }
        
        # Gather profile info
        profile_info = self.get_user_info(username)
        if profile_info:
            profile_data['profile_info'] = {
                'name': profile_info.get('name', 'N/A'),
                'created_utc': profile_info.get('created_utc', 0),
                'comment_karma': profile_info.get('comment_karma', 0),
                'link_karma': profile_info.get('link_karma', 0),
                'is_gold': profile_info.get('is_gold', False),
                'is_mod': profile_info.get('is_mod', False),
                'verified': profile_info.get('verified', False)
            }
        
        # Gather posts and comments
        profile_data['posts'] = self.get_user_posts(username, limit=25)
        profile_data['comments'] = self.get_user_comments(username, limit=25)
        
        # Analysis
        profile_data['analysis'] = self._perform_analysis(profile_data)
        
        return profile_data
    
    def _perform_analysis(self, profile_data: Dict) -> Dict:
        """Perform threat analysis on profile"""
        analysis = {
            'account_age': 'Unknown',
            'activity_level': 'Unknown',
            'karma_score': 0,
            'threat_indicators': [],
            'risk_score': 0
        }
        
        profile_info = profile_data.get('profile_info', {})
        posts = profile_data.get('posts', [])
        comments = profile_data.get('comments', [])
        
        # Account age
        created_utc = profile_info.get('created_utc', 0)
        if created_utc:
            from datetime import datetime, timezone
            account_age_days = (datetime.now(timezone.utc).timestamp() - created_utc) / 86400
            if account_age_days < 30:
                analysis['account_age'] = 'New'
                analysis['risk_score'] += 15
            elif account_age_days < 365:
                analysis['account_age'] = 'Recent'
            else:
                analysis['account_age'] = 'Established'
        
        # Activity level
        total_activity = len(posts) + len(comments)
        if total_activity > 100:
            analysis['activity_level'] = 'High'
        elif total_activity > 10:
            analysis['activity_level'] = 'Medium'
        else:
            analysis['activity_level'] = 'Low'
        
        # Karma analysis
        comment_karma = profile_info.get('comment_karma', 0)
        link_karma = profile_info.get('link_karma', 0)
        analysis['karma_score'] = comment_karma + link_karma
        
        if comment_karma < 0 or link_karma < 0:
            analysis['threat_indicators'].append('Negative karma')
            analysis['risk_score'] += 20
        
        # Risk scoring
        if analysis['account_age'] == 'New' and total_activity > 50:
            analysis['threat_indicators'].append('New account with high activity')
            analysis['risk_score'] += 15
        
        analysis['risk_score'] = min(analysis['risk_score'], 100)
        
        return analysis

