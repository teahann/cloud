from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import random

driver = webdriver.Chrome()
driver.get("https://spoc.zip")

# Navigate to random background
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'data'))).click()
driver.switch_to.frame(driver.find_element(By.TAG_NAME, 'iframe'))
WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.LINK_TEXT, 'Images'))).click()
a_tags = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.TAG_NAME, 'a')))
random.choice(a_tags).click()

# Set as background
WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//button[normalize-space()='Set BG']"))).click()

# Close iframe
driver.switch_to.default_content()
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'data'))).click()
time.sleep(8)

driver.quit()