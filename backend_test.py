import requests
import sys
import json
from datetime import datetime

class AureonAPITester:
    def __init__(self, base_url="https://pdf-to-website-41.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)

            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "timestamp": datetime.now().isoformat()
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    result["response_data"] = response_data
                    if isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                    elif isinstance(response_data, dict):
                        print(f"   Response keys: {list(response_data.keys())}")
                except:
                    result["response_data"] = response.text
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    result["error_data"] = error_data
                    print(f"   Error: {error_data}")
                except:
                    result["error_data"] = response.text
                    print(f"   Error text: {response.text}")

            self.test_results.append(result)
            return success, response.json() if success else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "success": False,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
            self.test_results.append(result)
            return False, {}

    def test_health_endpoints(self):
        """Test basic health endpoints"""
        print("\n=== TESTING HEALTH ENDPOINTS ===")
        
        # Test root endpoint
        self.run_test("API Root", "GET", "", 200)
        
        # Test health endpoint
        self.run_test("Health Check", "GET", "health", 200)

    def test_portfolio_endpoints(self):
        """Test portfolio-related endpoints"""
        print("\n=== TESTING PORTFOLIO ENDPOINTS ===")
        
        # Test seed portfolio
        success, response = self.run_test("Seed Portfolio", "POST", "seed-portfolio", 200)
        
        # Test get all portfolio projects
        success, projects = self.run_test("Get All Portfolio", "GET", "portfolio", 200)
        
        if success and projects:
            print(f"   Found {len(projects)} portfolio projects")
            
            # Test filtering by category
            self.run_test("Filter Capoto Projects", "GET", "portfolio", 200, params={"category": "capoto"})
            self.run_test("Filter Microcimento Projects", "GET", "portfolio", 200, params={"category": "microcimento"})
            
            # Test filtering by featured
            self.run_test("Get Featured Projects", "GET", "portfolio", 200, params={"featured": True})
            
            # Test get specific project
            if projects and len(projects) > 0:
                project_id = projects[0].get('id')
                if project_id:
                    self.run_test("Get Specific Project", "GET", f"portfolio/{project_id}", 200)
                    
                    # Test non-existent project
                    self.run_test("Get Non-existent Project", "GET", "portfolio/non-existent-id", 404)

    def test_contact_endpoints(self):
        """Test contact form endpoints"""
        print("\n=== TESTING CONTACT ENDPOINTS ===")
        
        # Test valid contact submission
        valid_contact = {
            "name": "João Silva",
            "email": "joao.silva@email.com",
            "phone": "912345678",
            "service_type": "capoto",
            "message": "Gostaria de um orçamento para isolamento térmico da minha moradia em Lisboa."
        }
        
        success, response = self.run_test("Submit Valid Contact", "POST", "contact", 200, data=valid_contact)
        
        if success:
            print(f"   Contact created with ID: {response.get('id')}")
        
        # Test invalid contact (missing required fields)
        invalid_contact = {
            "name": "Test",
            "email": "invalid-email"
        }
        
        self.run_test("Submit Invalid Contact", "POST", "contact", 422, data=invalid_contact)
        
        # Test get all contacts
        self.run_test("Get All Contacts", "GET", "contact", 200)

    def test_edge_cases(self):
        """Test edge cases and error handling"""
        print("\n=== TESTING EDGE CASES ===")
        
        # Test invalid endpoints
        self.run_test("Invalid Endpoint", "GET", "invalid-endpoint", 404)
        
        # Test contact with very long message
        long_message_contact = {
            "name": "Test User",
            "email": "test@email.com",
            "phone": "912345678",
            "service_type": "capoto",
            "message": "A" * 3000  # Very long message
        }
        
        self.run_test("Contact with Long Message", "POST", "contact", 422, data=long_message_contact)
        
        # Test contact with short message
        short_message_contact = {
            "name": "Test User",
            "email": "test@email.com",
            "phone": "912345678",
            "service_type": "capoto",
            "message": "Hi"  # Too short
        }
        
        self.run_test("Contact with Short Message", "POST", "contact", 422, data=short_message_contact)

def main():
    print("🚀 Starting AUREON API Testing...")
    print("=" * 50)
    
    tester = AureonAPITester()
    
    # Run all tests
    tester.test_health_endpoints()
    tester.test_portfolio_endpoints()
    tester.test_contact_endpoints()
    tester.test_edge_cases()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 FINAL RESULTS")
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed / tester.tests_run * 100):.1f}%")
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "summary": {
                "tests_run": tester.tests_run,
                "tests_passed": tester.tests_passed,
                "success_rate": tester.tests_passed / tester.tests_run * 100,
                "timestamp": datetime.now().isoformat()
            },
            "test_results": tester.test_results
        }, f, indent=2)
    
    print(f"\n📄 Detailed results saved to: /app/backend_test_results.json")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())